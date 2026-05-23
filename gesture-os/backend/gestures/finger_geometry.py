"""Rotation-aware finger state from 3D landmark geometry."""

from __future__ import annotations

import numpy as np

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
    THUMB_IP,
    THUMB_MCP,
    THUMB_TIP,
    WRIST,
)


def _vec(a: list[float], b: list[float]) -> np.ndarray:
    return np.array(b[:3]) - np.array(a[:3])


def _len(a: list[float], b: list[float]) -> float:
    return float(np.linalg.norm(_vec(a, b)))


def finger_extended(landmarks: list[list[float]], tip: int, pip: int, mcp: int) -> bool:
    """
    Finger is extended when the tip is far enough past the PIP joint.
    Works when palm faces camera, hand is tilted, or hand is sideways.
    """
    tip_to_pip = _len(landmarks[tip], landmarks[pip])
    pip_to_mcp = _len(landmarks[pip], landmarks[mcp])
    if pip_to_mcp < 1e-5:
        return False
    # Tip must extend beyond PIP (ratio tuned for MediaPipe normalized coords)
    if tip_to_pip / pip_to_mcp < 0.45:
        return False
    wrist = landmarks[WRIST]
    return _len(landmarks[tip], wrist) > _len(landmarks[pip], wrist) * 0.85


def thumb_extended(landmarks: list[list[float]]) -> bool:
    """Thumb extended — uses IP/MCP chain (thumb has different topology)."""
    tip_to_ip = _len(landmarks[THUMB_TIP], landmarks[THUMB_IP])
    ip_to_mcp = _len(landmarks[THUMB_IP], landmarks[THUMB_MCP])
    if ip_to_mcp < 1e-5:
        return False
    return tip_to_ip / ip_to_mcp > 0.45


def pinch_distance(landmarks: list[list[float]]) -> float:
    return _len(landmarks[THUMB_TIP], landmarks[INDEX_TIP])


def palm_center(landmarks: list[list[float]]) -> list[float]:
    pts = [landmarks[i] for i in (WRIST, INDEX_MCP, MIDDLE_MCP, RING_MCP, PINKY_MCP)]
    arr = np.mean(np.array(pts), axis=0)
    return arr.tolist()


def count_extended_fingers(landmarks: list[list[float]]) -> int:
    n = 0
    if finger_extended(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP):
        n += 1
    if finger_extended(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP):
        n += 1
    if finger_extended(landmarks, RING_TIP, RING_PIP, RING_MCP):
        n += 1
    if finger_extended(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP):
        n += 1
    if thumb_extended(landmarks):
        n += 1
    return n
