"""Multi-monitor virtual desktop bounds (Windows)."""

from __future__ import annotations

import sys
from dataclasses import dataclass


@dataclass
class ScreenBounds:
    left: int
    top: int
    width: int
    height: int


def get_virtual_screen() -> ScreenBounds:
    """All monitors as one coordinate space (Windows virtual screen)."""
    if sys.platform == "win32":
        try:
            import ctypes

            user32 = ctypes.windll.user32
            return ScreenBounds(
                left=user32.GetSystemMetrics(76),
                top=user32.GetSystemMetrics(77),
                width=user32.GetSystemMetrics(78),
                height=user32.GetSystemMetrics(79),
            )
        except Exception:
            pass

    import pyautogui

    w, h = pyautogui.size()
    return ScreenBounds(0, 0, w, h)
