"""Load, update, and persist runtime configuration."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_PATH = _ROOT / "config" / "settings.json"


class Settings:
    def __init__(self, path: Path | None = None) -> None:
        self._path = path or _DEFAULT_PATH
        self._data: dict[str, Any] = {}
        self.reload()

    def reload(self) -> None:
        with open(self._path, encoding="utf-8") as f:
            self._data = json.load(f)

    def get(self, key: str, default: Any = None) -> Any:
        return self._data.get(key, default)

    def __getitem__(self, key: str) -> Any:
        return self._data[key]

    def update(self, patch: dict[str, Any], save: bool = True) -> dict[str, Any]:
        """Apply runtime settings from HUD (only known keys)."""
        allowed = {
            "cursor_smoothing",
            "cursor_sensitivity",
            "landmark_smoothing",
            "screen_margin",
            "pinch_threshold",
            "right_click_threshold",
            "cursor_prediction",
            "min_hand_confidence",
            "enable_desktop_control",
            "enable_gesture_shortcuts",
            "enable_cursor_prediction",
            "show_debug_window",
            "gesture_cooldown_ms",
            "shortcut_cooldown_ms",
            "scroll_cooldown_ms",
            "gesture_stability_frames",
            "pinch_hold_ms",
            "auto_activate",
            "control_hand",
            "mirror_hud",
            "invert_x",
            "invert_y",
        }
        changed: dict[str, Any] = {}
        for k, v in patch.items():
            if k in allowed:
                self._data[k] = v
                changed[k] = v
        if save and changed:
            with open(self._path, "w", encoding="utf-8") as f:
                json.dump(self._data, f, indent=2)
        return changed

    def public_dict(self) -> dict[str, Any]:
        """Settings safe to expose to the HUD."""
        keys = [
            "cursor_smoothing",
            "cursor_sensitivity",
            "landmark_smoothing",
            "pinch_threshold",
            "cursor_prediction",
            "min_hand_confidence",
            "enable_desktop_control",
            "enable_gesture_shortcuts",
            "enable_cursor_prediction",
            "control_hand",
            "mirror_hud",
        ]
        return {k: self._data.get(k) for k in keys}

    @property
    def path(self) -> Path:
        return self._path


settings = Settings()
