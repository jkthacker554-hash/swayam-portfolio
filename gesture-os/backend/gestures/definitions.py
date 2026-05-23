"""Gesture types and landmark indices (MediaPipe Hands)."""

from __future__ import annotations

from enum import Enum


class GestureType(str, Enum):
    NONE = "none"
    OPEN_PALM = "open_palm"
    PINCH = "pinch"
    PINCH_HOLD = "pinch_hold"
    RIGHT_CLICK = "right_click"
    SCROLL_UP = "scroll_up"
    SCROLL_DOWN = "scroll_down"
    SWIPE_LEFT = "swipe_left"
    SWIPE_RIGHT = "swipe_right"
    FIST = "fist"
    PAUSED = "paused"
    THREE_FINGER = "three_finger"
    FOUR_FINGER = "four_finger"
    THUMBS_UP = "thumbs_up"


# MediaPipe landmark indices
WRIST = 0
THUMB_CMC = 1
THUMB_MCP = 2
THUMB_IP = 3
THUMB_TIP = 4
INDEX_MCP = 5
INDEX_PIP = 6
INDEX_DIP = 7
INDEX_TIP = 8
MIDDLE_MCP = 9
MIDDLE_PIP = 10
MIDDLE_DIP = 11
MIDDLE_TIP = 12
RING_MCP = 13
RING_PIP = 14
RING_DIP = 15
RING_TIP = 16
PINKY_MCP = 17
PINKY_PIP = 18
PINKY_DIP = 19
PINKY_TIP = 20
