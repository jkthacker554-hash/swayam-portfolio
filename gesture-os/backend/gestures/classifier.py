"""Rule-based gesture classification with stable pinch / pause logic."""

from __future__ import annotations

import time
from dataclasses import dataclass, field

from backend.config import settings
from backend.gestures.definitions import (
    INDEX_MCP,
    INDEX_PIP,
    INDEX_TIP,
    MIDDLE_MCP,
    MIDDLE_PIP,
    MIDDLE_TIP,
    PINKY_MCP,
    PINKY_PIP,
    PINKY_TIP,
    RING_MCP,
    RING_PIP,
    RING_TIP,
    GestureType,
)
from backend.gestures.finger_geometry import (
    count_extended_fingers,
    finger_extended,
    pinch_distance,
    thumb_extended,
)
from backend.tracking.hand_selector import select_control_hand
from backend.tracking.hand_tracker import HandData


@dataclass
class GestureState:
    current: GestureType = GestureType.NONE
    active: bool = True
    pinch_start_time: float = 0.0
    last_scroll_time: float = 0.0
    palm_history: list[float] = field(default_factory=list)
    pinch_held: bool = False


class GestureClassifier:
    def __init__(self) -> None:
        self.state = GestureState(active=bool(settings.get("auto_activate", True)))
        self._pinch_threshold = float(settings["pinch_threshold"])
        self._right_click_threshold = float(settings["right_click_threshold"])
        self._swipe_threshold = float(settings["swipe_threshold"])
        self._swipe_vel_min = float(settings["swipe_velocity_min"])
        self._pinch_hold_ms = int(settings.get("pinch_hold_ms", 350))
        self._history_len = 8

    def refresh_settings(self) -> None:
        self._pinch_threshold = float(settings["pinch_threshold"])
        self._right_click_threshold = float(settings["right_click_threshold"])
        self._pinch_hold_ms = int(settings.get("pinch_hold_ms", 350))

    def classify(self, hands: list[HandData]) -> GestureType:
        hand = select_control_hand(hands)
        if hand is None:
            self.state.pinch_held = False
            self.state.current = GestureType.NONE
            return GestureType.NONE

        lm = hand.landmarks
        extended = count_extended_fingers(lm)

        # True fist — all fingers curled (not just low count)
        if extended == 0:
            self.state.active = False
            self.state.pinch_held = False
            self.state.current = GestureType.FIST
            return GestureType.FIST

        # Re-activate: spread hand (3+ fingers) or auto_activate default on
        if not self.state.active and extended >= 3:
            self.state.active = True

        if not self.state.active:
            self.state.current = GestureType.PAUSED
            return GestureType.PAUSED

        pinch = pinch_distance(lm)
        index_up = finger_extended(lm, INDEX_TIP, INDEX_PIP, INDEX_MCP)
        middle_up = finger_extended(lm, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP)
        ring_up = finger_extended(lm, RING_TIP, RING_PIP, RING_MCP)
        pinky_up = finger_extended(lm, PINKY_TIP, PINKY_PIP, PINKY_MCP)

        # Pinch / drag (highest priority for desktop control)
        if pinch < self._pinch_threshold:
            now = time.time()
            if not self.state.pinch_held:
                self.state.pinch_start_time = now
                self.state.pinch_held = True
                held_ms = 0
            else:
                held_ms = (now - self.state.pinch_start_time) * 1000

            if held_ms >= self._pinch_hold_ms:
                self.state.current = GestureType.PINCH_HOLD
                return GestureType.PINCH_HOLD
            self.state.current = GestureType.PINCH
            return GestureType.PINCH

        self.state.pinch_held = False

        # Right click — tight ring, other fingers up, farther than normal pinch
        if (
            pinch < self._right_click_threshold
            and middle_up
            and index_up
            and ring_up
        ):
            self.state.current = GestureType.RIGHT_CLICK
            return GestureType.RIGHT_CLICK

        # Keyboard shortcut poses (only when not pinching)
        adv = self._advanced_gesture(lm, index_up, middle_up, ring_up, pinky_up)
        if adv != GestureType.NONE:
            self.state.current = adv
            return adv

        scroll_gesture = self._scroll_gesture(lm)
        if scroll_gesture != GestureType.NONE:
            now_ms = time.time() * 1000
            if now_ms - self.state.last_scroll_time >= int(settings["scroll_cooldown_ms"]):
                self.state.last_scroll_time = now_ms
                self.state.current = scroll_gesture
                return scroll_gesture

        swipe = self._detect_swipe(hand.index_tip[0])
        if swipe != GestureType.NONE:
            self.state.current = swipe
            return swipe

        # Open palm = tracking mode (cursor follows index)
        if extended >= 3:
            self.state.current = GestureType.OPEN_PALM
            return GestureType.OPEN_PALM

        self.state.current = GestureType.NONE
        return GestureType.NONE

    def _advanced_gesture(
        self,
        lm: list[list[float]],
        index_up: bool,
        middle_up: bool,
        ring_up: bool,
        pinky_up: bool,
    ) -> GestureType:
        if index_up and middle_up and ring_up and pinky_up:
            return GestureType.FOUR_FINGER
        if index_up and middle_up and ring_up and not pinky_up:
            return GestureType.THREE_FINGER
        if thumb_extended(lm) and not index_up and not middle_up and not ring_up and not pinky_up:
            return GestureType.THUMBS_UP
        return GestureType.NONE

    def _scroll_gesture(self, lm: list[list[float]]) -> GestureType:
        index_up = finger_extended(lm, INDEX_TIP, INDEX_PIP, INDEX_MCP)
        middle_up = finger_extended(lm, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP)
        ring_down = not finger_extended(lm, RING_TIP, RING_PIP, RING_MCP)
        pinky_down = not finger_extended(lm, PINKY_TIP, PINKY_PIP, PINKY_MCP)
        if not (index_up and middle_up and ring_down and pinky_down):
            return GestureType.NONE

        wrist_y = lm[0][1]
        tips_y = (lm[INDEX_TIP][1] + lm[MIDDLE_TIP][1]) / 2
        if tips_y < wrist_y - 0.012:
            return GestureType.SCROLL_UP
        if tips_y > wrist_y + 0.012:
            return GestureType.SCROLL_DOWN
        return GestureType.NONE

    def _detect_swipe(self, palm_x: float) -> GestureType:
        self.state.palm_history.append(palm_x)
        if len(self.state.palm_history) > self._history_len:
            self.state.palm_history.pop(0)
        if len(self.state.palm_history) < self._history_len:
            return GestureType.NONE

        delta = self.state.palm_history[-1] - self.state.palm_history[0]
        velocity = abs(delta) / max(len(self.state.palm_history) - 1, 1)
        if velocity < self._swipe_vel_min:
            return GestureType.NONE
        if delta > self._swipe_threshold:
            self.state.palm_history.clear()
            return GestureType.SWIPE_RIGHT
        if delta < -self._swipe_threshold:
            self.state.palm_history.clear()
            return GestureType.SWIPE_LEFT
        return GestureType.NONE
