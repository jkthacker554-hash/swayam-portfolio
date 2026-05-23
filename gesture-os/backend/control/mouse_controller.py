"""Virtual mouse — multi-monitor, prediction, reliable clicks."""

from __future__ import annotations

import pyautogui

from backend.config import settings
from backend.control.display_manager import ScreenBounds, get_virtual_screen
from backend.gestures.definitions import GestureType
from backend.tracking.gesture_predictor import CursorPredictor
from backend.tracking.landmark_smoothing import CursorSmoother

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0


class MouseController:
    def __init__(self) -> None:
        self._smoother = CursorSmoother(alpha=float(settings["cursor_smoothing"]))
        self._predictor = CursorPredictor(strength=float(settings.get("cursor_prediction", 0.2)))
        self._sensitivity = float(settings["cursor_sensitivity"])
        self._margin = float(settings["screen_margin"])
        self._min_conf = float(settings.get("min_hand_confidence", 0.35))
        self._dragging = False
        self._last_gesture: GestureType | None = None
        self._enabled = bool(settings["enable_desktop_control"])
        self._predict_enabled = bool(settings.get("enable_cursor_prediction", True))
        self._bounds: ScreenBounds = get_virtual_screen()
        self._last_pos = (0, 0)

    def refresh_settings(self) -> None:
        self._smoother.alpha = float(settings["cursor_smoothing"])
        self._sensitivity = float(settings["cursor_sensitivity"])
        self._margin = float(settings["screen_margin"])
        self._min_conf = float(settings.get("min_hand_confidence", 0.35))
        self._enabled = bool(settings["enable_desktop_control"])
        self._predict_enabled = bool(settings.get("enable_cursor_prediction", True))
        self._predictor.set_strength(float(settings.get("cursor_prediction", 0.2)))
        self._bounds = get_virtual_screen()

    def reset(self) -> None:
        self._smoother.reset()
        self._predictor.reset()
        self._dragging = False

    def _norm_to_screen(self, nx: float, ny: float) -> tuple[float, float]:
        if settings.get("invert_x"):
            nx = 1.0 - nx
        if settings.get("invert_y"):
            ny = 1.0 - ny

        nx = (nx - 0.5) * self._sensitivity + 0.5
        ny = (ny - 0.5) * self._sensitivity + 0.5
        nx = max(self._margin, min(1.0 - self._margin, nx))
        ny = max(self._margin, min(1.0 - self._margin, ny))

        x = self._bounds.left + nx * self._bounds.width
        y = self._bounds.top + ny * self._bounds.height
        return x, y

    def move(self, index_tip: list[float], confidence: float = 1.0) -> tuple[int, int]:
        if not self._enabled:
            return self._last_pos
        # Soft confidence — scale movement instead of hard block
        if confidence < self._min_conf * 0.5:
            return self._last_pos

        sx, sy = self._norm_to_screen(index_tip[0], index_tip[1])
        fx, fy = self._smoother.update(sx, sy)
        if self._predict_enabled:
            fx, fy = self._predictor.apply(fx, fy)

        ix, iy = int(fx), int(fy)
        pyautogui.moveTo(ix, iy, _pause=False)
        self._last_pos = (ix, iy)
        return ix, iy

    def handle_gesture(self, gesture: GestureType, index_tip: list[float], confidence: float = 1.0) -> None:
        prev = self._last_gesture
        self._last_gesture = gesture

        if not self._enabled or gesture in (GestureType.PAUSED, GestureType.FIST):
            if self._dragging:
                pyautogui.mouseUp()
                self._dragging = False
            return

        # Always move cursor when tracking (except during shortcut-only poses)
        tracking_gestures = (
            GestureType.NONE,
            GestureType.OPEN_PALM,
            GestureType.PINCH,
            GestureType.PINCH_HOLD,
            GestureType.RIGHT_CLICK,
            GestureType.SCROLL_UP,
            GestureType.SCROLL_DOWN,
        )
        if gesture in tracking_gestures:
            self.move(index_tip, confidence)

        if gesture == GestureType.PINCH and prev != GestureType.PINCH:
            pyautogui.click(_pause=False)
            print("[Gesture OS] Click")
            return

        if gesture == GestureType.PINCH_HOLD:
            if not self._dragging:
                pyautogui.mouseDown()
                self._dragging = True
                print("[Gesture OS] Drag start")
            return

        if self._dragging and gesture not in (GestureType.PINCH_HOLD, GestureType.PINCH):
            pyautogui.mouseUp()
            self._dragging = False
            print("[Gesture OS] Drag end")

        if gesture == GestureType.RIGHT_CLICK and prev != GestureType.RIGHT_CLICK:
            pyautogui.click(button="right", _pause=False)
            print("[Gesture OS] Right click")
            return

        if gesture == GestureType.SCROLL_UP and prev != GestureType.SCROLL_UP:
            pyautogui.scroll(4, _pause=False)
            return

        if gesture == GestureType.SCROLL_DOWN and prev != GestureType.SCROLL_DOWN:
            pyautogui.scroll(-4, _pause=False)
            return

    def release_drag(self) -> None:
        if self._dragging:
            pyautogui.mouseUp()
            self._dragging = False
