"""Pick which detected hand drives cursor and gestures."""

from __future__ import annotations

from backend.config import settings
from backend.tracking.hand_tracker import HandData


def select_control_hand(hands: list[HandData]) -> HandData | None:
    if not hands:
        return None

    pref = str(settings.get("control_hand", "any")).lower()
    if pref == "any":
        return max(hands, key=lambda h: h.confidence)
    if pref == "left":
        return next((h for h in hands if h.handedness == "Left"), hands[0])
    if pref == "right":
        return next((h for h in hands if h.handedness == "Right"), hands[0])
    return hands[0]
