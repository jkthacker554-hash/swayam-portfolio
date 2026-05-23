"""MediaPipe Hand Landmarker (Tasks API) — works with mediapipe >= 0.10.30."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import cv2
import numpy as np

from backend.config import settings
from backend.tracking.landmark_smoothing import EMASmoother

# Hand skeleton connections for debug overlay
HAND_CONNECTIONS = [
    (0, 1), (1, 2), (2, 3), (3, 4),
    (0, 5), (5, 6), (6, 7), (7, 8),
    (0, 9), (9, 10), (10, 11), (11, 12),
    (0, 13), (13, 14), (14, 15), (15, 16),
    (0, 17), (17, 18), (18, 19), (19, 20),
    (5, 9), (9, 13), (13, 17),
]

_MODEL_PATH = (
    Path(__file__).resolve().parent.parent.parent / "models" / "hand_landmarker.task"
)


@dataclass
class HandData:
    handedness: str
    landmarks: list[list[float]]
    index_tip: list[float] = field(default_factory=list)
    confidence: float = 1.0


class HandTracker:
    def __init__(self) -> None:
        if not _MODEL_PATH.is_file():
            raise FileNotFoundError(
                f"Hand model missing: {_MODEL_PATH}\n"
                "Run: python scripts/download_models.py"
            )

        from mediapipe.tasks.python import BaseOptions
        from mediapipe.tasks.python.vision import HandLandmarker, HandLandmarkerOptions, RunningMode
        from mediapipe.tasks.python.vision.core.image import ImageFormat
        from mediapipe.tasks.python.vision.core import vision_task_running_mode

        self._ImageFormat = ImageFormat
        self._RunningMode = RunningMode

        options = HandLandmarkerOptions(
            base_options=BaseOptions(model_asset_path=str(_MODEL_PATH)),
            running_mode=vision_task_running_mode.VisionTaskRunningMode.VIDEO,
            num_hands=int(settings["max_hands"]),
            min_hand_detection_confidence=float(settings["min_detection_confidence"]),
            min_hand_presence_confidence=float(settings["min_tracking_confidence"]),
            min_tracking_confidence=float(settings["min_tracking_confidence"]),
        )
        self._landmarker = HandLandmarker.create_from_options(options)
        self._mirror = bool(settings.get("mirror_frame", True))
        self._smooth_alpha = float(settings.get("landmark_smoothing", 0.55))
        self._smoothers: dict[str, EMASmoother] = {}
        self._timestamp_ms = 0

    def _get_smoother(self, label: str) -> EMASmoother:
        if label not in self._smoothers:
            self._smoothers[label] = EMASmoother(alpha=self._smooth_alpha)
        return self._smoothers[label]

    def _fix_handedness(self, label: str) -> str:
        if self._mirror:
            return "Left" if label == "Right" else "Right"
        return label

    def process(self, frame_bgr: np.ndarray) -> list[HandData]:
        from mediapipe.tasks.python.vision.core.image import Image

        rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        mp_image = Image(image_format=self._ImageFormat.SRGB, data=rgb)

        self._timestamp_ms += 33  # ~30fps monotonic timestamp for VIDEO mode
        result = self._landmarker.detect_for_video(mp_image, self._timestamp_ms)

        hands: list[HandData] = []
        if not result.hand_landmarks:
            return hands

        handedness_list = result.handedness or []
        for idx, hand_lms in enumerate(result.hand_landmarks):
            label = "Right"
            conf = 1.0
            if idx < len(handedness_list) and handedness_list[idx]:
                cat = handedness_list[idx][0]
                label = cat.category_name or "Right"
                conf = float(cat.score)

            label = self._fix_handedness(label)
            raw = [[lm.x, lm.y, lm.z] for lm in hand_lms]
            smoothed = self._get_smoother(f"{label}_{idx}").smooth(raw)
            index_tip = smoothed[8] if len(smoothed) > 8 else [0.5, 0.5, 0]

            hands.append(
                HandData(
                    handedness=label,
                    landmarks=smoothed,
                    index_tip=index_tip,
                    confidence=conf,
                )
            )
        return hands

    def close(self) -> None:
        self._landmarker.close()
