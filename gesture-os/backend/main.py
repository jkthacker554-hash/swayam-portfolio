"""
Gesture OS — vision loop, desktop control, advanced features, HUD stream.
"""

from __future__ import annotations

import asyncio
import sys
import time
from collections import deque
from pathlib import Path

import cv2

_ROOT = Path(__file__).resolve().parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from backend.config import settings
from backend.control.desktop_actions import DesktopActions
from backend.control.gesture_shortcuts import GestureShortcuts
from backend.control.mouse_controller import MouseController
from backend.features.macro_recorder import MacroRecorder
from backend.features.pinch_calibrator import PinchCalibrator
from backend.gestures.classifier import GestureClassifier
from backend.gestures.definitions import GestureType
from backend.gestures.gesture_stability import GestureStabilizer
from backend.server.websocket_server import HUDWebSocketServer
from backend.tracking.hand_tracker import HAND_CONNECTIONS, HandTracker
from backend.tracking.hand_selector import select_control_hand

_GESTURE_HISTORY: deque[str] = deque(maxlen=8)


def _draw_debug(frame, hands, gesture: GestureType, fps: float) -> None:
    h, w = frame.shape[:2]
    for hand in hands:
        pts = [(int(lm[0] * w), int(lm[1] * h)) for lm in hand.landmarks]
        for a, b in HAND_CONNECTIONS:
            cv2.line(frame, pts[a], pts[b], (0, 200, 255), 2)
        for i, (cx, cy) in enumerate(pts):
            color = (0, 255, 100) if i == 8 else (255, 100, 255)
            cv2.circle(frame, (cx, cy), 5 if i == 8 else 3, color, -1)
    cv2.putText(
        frame,
        f"{gesture.value} | {fps:.0f} FPS | hands:{len(hands)}",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 100, 255),
        2,
    )


def _build_payload(
    hands: list,
    gesture: GestureType,
    fps: float,
    cursor: tuple[int, int],
    active: bool,
    latency_ms: float,
    macro: MacroRecorder,
    calib_status: dict | None,
) -> dict:
    if gesture.value != "none":
        _GESTURE_HISTORY.appendleft(gesture.value)

    return {
        "type": "frame",
        "fps": round(fps, 1),
        "latency_ms": round(latency_ms, 1),
        "gesture": gesture.value,
        "active": active,
        "cursor": {"x": cursor[0], "y": cursor[1]},
        "gesture_history": list(_GESTURE_HISTORY),
        "macro": {
            "recording": macro.recording,
            "playing": macro.playing,
            "events": len(macro.events),
        },
        "calibration": calib_status,
        "hands": [
            {
                "label": h.handedness,
                "confidence": h.confidence,
                "landmarks": h.landmarks,
                "index_tip": h.index_tip,
            }
            for h in hands
        ],
        "mirror_hud": bool(settings.get("mirror_hud", True)),
        "settings": settings.public_dict(),
        "timestamp": time.time(),
    }


async def handle_command(
    msg: dict,
    classifier: GestureClassifier,
    mouse: MouseController,
    shortcuts: GestureShortcuts,
    macro: MacroRecorder,
    calib: PinchCalibrator,
) -> dict | None:
    action = msg.get("action")
    if action == "update_settings":
        changed = settings.update(msg.get("patch", {}))
        classifier.refresh_settings()
        mouse.refresh_settings()
        shortcuts.reload()
        return {"type": "ack", "action": action, "changed": changed, "settings": settings.public_dict()}

    if action == "calibrate_pinch":
        calib.start(float(msg.get("duration", 6)))
        return {"type": "ack", "action": action, "message": "Pinch thumb+index repeatedly for 6s"}

    if action == "macro_record_start":
        macro.start_record()
        return {"type": "ack", "action": action, "recording": True}

    if action == "macro_record_stop":
        n = macro.stop_record()
        return {"type": "ack", "action": action, "events": n, "macro": macro.to_list()}

    if action == "macro_play":
        asyncio.create_task(macro.play(mouse.handle_gesture))
        return {"type": "ack", "action": action, "playing": True}

    if action == "reload_config":
        settings.reload()
        classifier.refresh_settings()
        mouse.refresh_settings()
        shortcuts.reload()
        return {"type": "ack", "action": action, "settings": settings.public_dict()}

    return {"type": "error", "message": f"Unknown action: {action}"}


async def run_loop(ws_server: HUDWebSocketServer) -> None:
    tracker = HandTracker()
    classifier = GestureClassifier()
    stabilizer = GestureStabilizer(int(settings.get("gesture_stability_frames", 2)))
    mouse = MouseController()
    shortcuts = GestureShortcuts()
    macro = MacroRecorder()
    calib = PinchCalibrator()

    async def on_command(msg: dict) -> dict | None:
        return await handle_command(msg, classifier, mouse, shortcuts, macro, calib)

    ws_server.set_command_handler(on_command)

    cam_idx = int(settings["camera_index"])
    cap = cv2.VideoCapture(cam_idx, cv2.CAP_DSHOW)
    if not cap.isOpened():
        cap = cv2.VideoCapture(cam_idx)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, int(settings["frame_width"]))
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, int(settings["frame_height"]))
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    cap.read()

    if not cap.isOpened():
        print("[ERROR] Cannot open webcam.")
        return

    ok, test_frame = cap.read()
    if not ok or test_frame is None:
        print("[ERROR] Camera returns no frames.")
        cap.release()
        return

    print(f"[Gesture OS] Camera {cam_idx} active ({test_frame.shape[1]}x{test_frame.shape[0]})")
    print("[Gesture OS] Active by default. Fist=all fingers down = pause. Spread 3 fingers = resume.")
    print("[Gesture OS] Pinch=click | Hold pinch 0.35s=drag | 2 fingers=scroll | Tab=settings")

    show_debug = bool(settings.get("show_debug_window", False))
    prev_gesture = GestureType.NONE
    frame_count = 0
    fps_timer = time.time()
    fps = 0.0
    cursor = (0, 0)

    try:
        while True:
            t0 = time.perf_counter()
            ok, frame = cap.read()
            if not ok:
                await asyncio.sleep(0.01)
                continue

            if settings.get("mirror_frame", True):
                frame = cv2.flip(frame, 1)

            hands = tracker.process(frame)
            raw_gesture = classifier.classify(hands)
            gesture = stabilizer.update(raw_gesture)
            active = classifier.state.active

            calib_status = calib.tick(hands) if calib.active else None
            if calib_status and not calib_status.get("calibrating") and calib_status.get("pinch_threshold"):
                settings.update({"pinch_threshold": calib_status["pinch_threshold"]})
                classifier.refresh_settings()

            primary = select_control_hand(hands)
            conf = primary.confidence if primary else 0.0

            if hands and active and gesture not in (GestureType.FIST, GestureType.PAUSED):
                if primary:
                    mouse.handle_gesture(gesture, primary.index_tip, conf)
                    cursor = mouse._last_pos
                    macro.capture(gesture, cursor)
            elif prev_gesture == GestureType.PINCH_HOLD and gesture not in (
                GestureType.PINCH_HOLD,
                GestureType.PINCH,
            ):
                mouse.release_drag()

            if gesture in (GestureType.SWIPE_LEFT, GestureType.SWIPE_RIGHT):
                if gesture != prev_gesture:
                    DesktopActions.handle(gesture)

            if gesture != prev_gesture:
                shortcuts.handle(gesture)

            prev_gesture = gesture

            frame_count += 1
            elapsed = time.time() - fps_timer
            if elapsed >= 1.0:
                fps = frame_count / elapsed
                frame_count = 0
                fps_timer = time.time()

            latency_ms = (time.perf_counter() - t0) * 1000

            await ws_server.broadcast(
                _build_payload(hands, gesture, fps, cursor, active, latency_ms, macro, calib_status)
            )

            if show_debug:
                _draw_debug(frame, hands, gesture, fps)
                cv2.imshow("Gesture OS Debug", frame)
                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break

            await asyncio.sleep(max(0, 1.0 / int(settings["fps_target"]) - 0.001))
    finally:
        mouse.release_drag()
        tracker.close()
        cap.release()
        cv2.destroyAllWindows()


async def main() -> None:
    ws_server = HUDWebSocketServer()
    await ws_server.start()
    try:
        await run_loop(ws_server)
    finally:
        await ws_server.stop()


def _check_environment() -> bool:
    if sys.version_info >= (3, 14):
        print("[WARN] Prefer .\\venv\\Scripts\\python.exe -m backend.main\n")
    try:
        import mediapipe  # noqa: F401
    except ImportError:
        print("[ERROR] pip install -r requirements.txt")
        return False
    if not (_ROOT / "models" / "hand_landmarker.task").is_file():
        print("[ERROR] Run: python scripts/download_models.py")
        return False
    return True


if __name__ == "__main__":
    if _check_environment():
        asyncio.run(main())
