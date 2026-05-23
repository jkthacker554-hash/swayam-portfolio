"""Predict cursor position from recent velocity — reduces perceived lag."""

from __future__ import annotations

import numpy as np


class CursorPredictor:
    def __init__(self, strength: float = 0.2, history: int = 5) -> None:
        self.strength = strength
        self._history: list[np.ndarray] = []
        self._max = history

    def set_strength(self, strength: float) -> None:
        self.strength = max(0.0, min(1.0, strength))

    def reset(self) -> None:
        self._history.clear()

    def apply(self, x: float, y: float) -> tuple[float, float]:
        pos = np.array([x, y], dtype=np.float64)
        self._history.append(pos)
        if len(self._history) > self._max:
            self._history.pop(0)
        if len(self._history) < 2 or self.strength <= 0:
            return x, y

        velocity = self._history[-1] - self._history[-2]
        predicted = pos + velocity * (self.strength * 3.0)
        return float(predicted[0]), float(predicted[1])
