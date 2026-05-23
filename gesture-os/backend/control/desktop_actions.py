"""Windows desktop shortcuts (virtual desktops, etc.)."""

from __future__ import annotations

import pyautogui

from backend.gestures.definitions import GestureType


class DesktopActions:
    """OS-level shortcuts triggered by gestures."""

    @staticmethod
    def handle(gesture: GestureType) -> None:
        if gesture == GestureType.SWIPE_LEFT:
            # Win+Ctrl+Left — previous virtual desktop
            pyautogui.hotkey("win", "ctrl", "left", _pause=False)
        elif gesture == GestureType.SWIPE_RIGHT:
            pyautogui.hotkey("win", "ctrl", "right", _pause=False)
