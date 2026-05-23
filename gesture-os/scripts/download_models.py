"""Download MediaPipe task models (required once)."""

from __future__ import annotations

import urllib.request
from pathlib import Path

MODELS = {
    "hand_landmarker.task": (
        "https://storage.googleapis.com/mediapipe-models/"
        "hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
    ),
}

ROOT = Path(__file__).resolve().parent.parent / "models"


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    for name, url in MODELS.items():
        dest = ROOT / name
        if dest.exists():
            print(f"OK  {name} ({dest.stat().st_size} bytes)")
            continue
        print(f"Downloading {name}...")
        urllib.request.urlretrieve(url, dest)
        print(f"Saved {dest}")


if __name__ == "__main__":
    main()
