"""Map advanced gestures to keyboard shortcuts — stable edge trigger."""

from __future__ import annotations

import time

import pyautogui

from backend.config import settings
from backend.gestures.definitions import GestureType

_SHORTCUT_GESTURES = {
    GestureType.THREE_FINGER,
    GestureType.FOUR_FINGER,
    GestureType.THUMBS_UP,
}

_RESET_GESTURES = {
    GestureType.NONE,
    GestureType.OPEN_PALM,
    GestureType.FIST,
    GestureType.PAUSED,
    GestureType.PINCH,
    GestureType.PINCH_HOLD,
}


def _hotkey(spec: str) -> None:
    keys = [k.strip() for k in spec.lower().split("+")]
    pyautogui.hotkey(*keys, _pause=False)


class GestureShortcuts:
    def __init__(self) -> None:
        self._map = dict(settings.get("gesture_shortcuts", {}))
        self._last: GestureType | None = None
        self._cooldown_ms = int(settings.get("shortcut_cooldown_ms", 800))
        self._last_fire = 0.0

    def reload(self) -> None:
        self._map = dict(settings.get("gesture_shortcuts", {}))
        self._cooldown_ms = int(settings.get("shortcut_cooldown_ms", 800))

    def handle(self, gesture: GestureType) -> bool:
        if not settings.get("enable_gesture_shortcuts", True):
            return False

        if gesture in _RESET_GESTURES:
            self._last = None
            return False

        if gesture not in _SHORTCUT_GESTURES:
            return False

        if gesture == self._last:
            return False

        now = time.time() * 1000
        if now - self._last_fire < self._cooldown_ms:
            return False

        spec = self._map.get(gesture.value)
        if not spec:
            return False

        self._last = gesture
        self._last_fire = now
        _hotkey(spec)
        print(f"[Gesture OS] Shortcut: {gesture.value} → {spec}")
        return True
