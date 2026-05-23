"""Record and replay gesture / action sequences."""

from __future__ import annotations

import asyncio
import time
from dataclasses import dataclass, field
from typing import Any

import pyautogui

from backend.gestures.definitions import GestureType


@dataclass
class MacroEvent:
    offset_s: float
    gesture: str
    cursor: dict[str, int] | None = None


class MacroRecorder:
    def __init__(self) -> None:
        self.recording = False
        self.playing = False
        self.events: list[MacroEvent] = []
        self._t0 = 0.0
        self._last_t = 0.0

    def start_record(self) -> None:
        self.recording = True
        self.playing = False
        self.events.clear()
        self._t0 = time.time()
        self._last_t = self._t0

    def stop_record(self) -> int:
        self.recording = False
        return len(self.events)

    def capture(self, gesture: GestureType, cursor: tuple[int, int]) -> None:
        if not self.recording:
            return
        now = time.time()
        offset = now - self._t0
        # Skip duplicate gesture spam within 0.15s
        if self.events and self.events[-1].gesture == gesture.value and offset - self.events[-1].offset_s < 0.15:
            return
        self.events.append(
            MacroEvent(
                offset_s=offset,
                gesture=gesture.value,
                cursor={"x": cursor[0], "y": cursor[1]},
            )
        )

    async def play(self, mouse_handler) -> None:
        if not self.events or self.playing:
            return
        self.playing = True
        try:
            t0 = time.time()
            for ev in self.events:
                wait = ev.offset_s - (time.time() - t0)
                if wait > 0:
                    await asyncio.sleep(wait)
                if ev.cursor:
                    pyautogui.moveTo(ev.cursor["x"], ev.cursor["y"], _pause=False)
                try:
                    g = GestureType(ev.gesture)
                except ValueError:
                    g = None
                if g and ev.cursor:
                    tip = [0.5, 0.5, 0]
                    mouse_handler(g, tip)
        finally:
            self.playing = False

    def to_list(self) -> list[dict[str, Any]]:
        return [
            {"offset_s": e.offset_s, "gesture": e.gesture, "cursor": e.cursor}
            for e in self.events
        ]
