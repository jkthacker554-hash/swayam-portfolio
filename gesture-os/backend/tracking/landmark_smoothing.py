"""Exponential moving average smoothing for landmarks and cursor."""

from __future__ import annotations

from typing import Sequence

import numpy as np


class EMASmoother:
    """Per-point exponential moving average for stable tracking."""

    def __init__(self, alpha: float = 0.35, num_points: int = 21) -> None:
        self.alpha = alpha
        self._state: np.ndarray | None = None
        self._num_points = num_points

    def reset(self) -> None:
        self._state = None

    def smooth(self, points: Sequence[Sequence[float]]) -> list[list[float]]:
        arr = np.array(points, dtype=np.float64)
        if self._state is None or self._state.shape != arr.shape:
            self._state = arr.copy()
            return arr.tolist()

        self._state = self.alpha * arr + (1.0 - self.alpha) * self._state
        return self._state.tolist()


class CursorSmoother:
    """2D cursor position with velocity-based prediction."""

    def __init__(self, alpha: float = 0.35) -> None:
        self.alpha = alpha
        self._pos: np.ndarray | None = None
        self._vel: np.ndarray = np.zeros(2)

    def reset(self) -> None:
        self._pos = None
        self._vel = np.zeros(2)

    def update(self, x: float, y: float, predict: float = 0.15) -> tuple[float, float]:
        target = np.array([x, y], dtype=np.float64)
        if self._pos is None:
            self._pos = target.copy()
            return float(self._pos[0]), float(self._pos[1])

        self._vel = target - self._pos
        self._pos = self.alpha * target + (1.0 - self.alpha) * self._pos
        predicted = self._pos + self._vel * predict
        return float(predicted[0]), float(predicted[1])
