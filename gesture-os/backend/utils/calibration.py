"""
Optional gesture calibration — prints pinch distance samples for tuning settings.json.
Run: python -m backend.utils.calibration
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np

_ROOT = Path(__file__).resolve().parent.parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from backend.config import settings
from backend.gestures.definitions import INDEX_TIP, THUMB_TIP
from backend.tracking.hand_tracker import HandTracker


def main() -> None:
    print("Pinch calibration — hold pinch steady; press Q to quit.")
    tracker = HandTracker()
    cap = cv2.VideoCapture(int(settings["camera_index"]))
    samples: list[float] = []

    while cap.isOpened():
        ok, frame = cap.read()
        if not ok:
            break
        frame = cv2.flip(frame, 1)
        hands = tracker.process(frame)
        if hands:
            lm = hands[0].landmarks
            d = float(np.linalg.norm(np.array(lm[THUMB_TIP][:2]) - np.array(lm[INDEX_TIP][:2])))
            samples.append(d)
            cv2.putText(frame, f"pinch dist: {d:.4f}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        cv2.imshow("Calibration", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    tracker.close()
    cv2.destroyAllWindows()

    if samples:
        arr = np.array(samples)
        print(f"min={arr.min():.4f} median={np.median(arr):.4f} max={arr.max():.4f}")
        print(f"Suggested pinch_threshold: {np.percentile(arr, 25):.4f}")
        print(f"Suggested right_click_threshold: {np.percentile(arr, 15):.4f}")


if __name__ == "__main__":
    main()
