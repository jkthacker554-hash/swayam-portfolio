"""Live pinch threshold calibration from HUD."""

from __future__ import annotations

import time

from backend.gestures.finger_geometry import pinch_distance
from backend.tracking.hand_selector import select_control_hand
from backend.tracking.hand_tracker import HandData


class PinchCalibrator:
    def __init__(self) -> None:
        self.active = False
        self._samples: list[float] = []
        self._deadline = 0.0

    def start(self, duration_s: float = 6.0) -> None:
        self.active = True
        self._samples.clear()
        self._deadline = time.time() + duration_s

    def tick(self, hands: list[HandData]) -> dict | None:
        if not self.active:
            return None
        hand = select_control_hand(hands)
        if hand:
            d = pinch_distance(hand.landmarks)
            if d < 0.12:  # only sample when user is pinching
                self._samples.append(d)

        remaining = max(0, int(self._deadline - time.time()))
        if time.time() < self._deadline:
            return {
                "calibrating": True,
                "samples": len(self._samples),
                "remaining_s": remaining,
            }

        self.active = False
        if len(self._samples) < 5:
            return {"calibrating": False, "error": "Not enough pinch samples. Pinch thumb+index repeatedly."}

        import numpy as np

        arr = np.array(self._samples)
        # Threshold slightly above typical pinch so open hand doesn't click
        threshold = float(np.percentile(arr, 70) * 1.15)
        return {
            "calibrating": False,
            "pinch_threshold": round(threshold, 4),
            "samples": len(self._samples),
            "median": round(float(np.median(arr)), 4),
        }
