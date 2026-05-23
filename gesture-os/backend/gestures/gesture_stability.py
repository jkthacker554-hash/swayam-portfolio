"""Require the same gesture for N frames before acting — stops flicker."""

from __future__ import annotations

from backend.gestures.definitions import GestureType


class GestureStabilizer:
    def __init__(self, frames: int = 3) -> None:
        self._required = max(1, frames)
        self._buffer: list[GestureType] = []
        self._stable: GestureType = GestureType.NONE

    def set_frames(self, n: int) -> None:
        self._required = max(1, n)

    def update(self, raw: GestureType) -> GestureType:
        self._buffer.append(raw)
        if len(self._buffer) > self._required:
            self._buffer.pop(0)
        if len(self._buffer) < self._required:
            return self._stable
        if all(g == raw for g in self._buffer):
            self._stable = raw
        return self._stable

    def reset(self) -> None:
        self._buffer.clear()
        self._stable = GestureType.NONE
