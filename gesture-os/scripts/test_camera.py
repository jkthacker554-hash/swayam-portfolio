"""
Quick webcam diagnostic — run before Gesture OS to check permissions and device index.

  cd gesture-os
  venv\\Scripts\\python.exe scripts\\test_camera.py
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2

_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))

from backend.config import settings  # noqa: E402


def try_open(index: int, backend_name: str, api: int) -> bool:
    cap = cv2.VideoCapture(index, api)
    if not cap.isOpened():
        print(f"  [{index}] {backend_name}: FAILED to open")
        return False
    ok, frame = cap.read()
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cap.release()
    if not ok or frame is None:
        print(f"  [{index}] {backend_name}: opened but no frame")
        return False
    print(f"  [{index}] {backend_name}: OK ({w}x{h})")
    return True


def main() -> None:
    preferred = int(settings.get("camera_index", 0))
    print("=" * 50)
    print("Gesture OS — Camera diagnostic")
    print("=" * 50)
    print(f"\nConfigured camera_index: {preferred}\n")
    print("Scanning indices 0–3 (DirectShow + default):\n")

    found: list[int] = []
    for i in range(4):
        if try_open(i, "DirectShow", cv2.CAP_DSHOW):
            found.append(i)
        elif try_open(i, "default", 0):
            found.append(i)

    print()
    if not found:
        print("NO CAMERA FOUND")
        print_permission_help()
        sys.exit(1)

    print(f"Working camera index(es): {found}")
    if preferred not in found:
        print(f"\n>>> Update config/settings.json: \"camera_index\": {found[0]}")
    else:
        print(f"\n>>> camera_index {preferred} should work.")

    print("\nOpening preview for 5 seconds (press Q to close early)...")
    cap = cv2.VideoCapture(found[0], cv2.CAP_DSHOW)
    if not cap.isOpened():
        cap = cv2.VideoCapture(found[0])
    if not cap.isOpened():
        print("Could not open preview.")
        sys.exit(1)

    for _ in range(150):
        ok, frame = cap.read()
        if not ok:
            break
        frame = cv2.flip(frame, 1)
        cv2.putText(
            frame,
            f"Camera {found[0]} OK - Q to quit",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )
        cv2.imshow("Gesture OS Camera Test", frame)
        if cv2.waitKey(33) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("\nCamera test passed. Start Gesture OS with .\\scripts\\start.ps1")


def print_permission_help() -> None:
    print(
        """
WINDOWS CAMERA PERMISSIONS (required):

1. Settings → Privacy & security → Camera
   - Turn ON "Camera access"
   - Turn ON "Let apps access your camera"
   - Turn ON "Let desktop apps access your camera"  ← Python needs this

2. Close other apps using the webcam:
   Zoom, Teams, Discord, OBS, another browser tab, etc.

3. Laptop: check physical camera shutter / Fn key that disables camera.

4. Try a different USB port (external webcam).

5. Device Manager → Cameras — confirm driver is installed, no yellow warning.

Then run this script again:
  .\\venv\\Scripts\\python.exe scripts\\test_camera.py
"""
    )


if __name__ == "__main__":
    main()
