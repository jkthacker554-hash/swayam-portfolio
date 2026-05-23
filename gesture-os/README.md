# Gesture OS

A **futuristic gesture-controlled desktop system** for Windows. Control your real mouse, drag files, scroll, and switch virtual desktops using hand movements through a webcam — with a transparent **Iron Man / Minority Report** holographic HUD overlay.

![Stack](https://img.shields.io/badge/Python-OpenCV%20%2B%20MediaPipe-blue) ![Electron](https://img.shields.io/badge/UI-Electron%20%2B%20Three.js-cyan)

---

## Features

| Feature | Description |
|--------|-------------|
| Real-time hand tracking | MediaPipe Hands, up to 2 hands |
| Gesture recognition | Pinch, scroll, swipe, fist, palm, right-click ring |
| Virtual mouse | PyAutoGUI — move, click, drag-drop, scroll |
| Desktop shortcuts | Swipe → Windows virtual desktops |
| HUD overlay | Electron transparent overlay, glassmorphism, particles |
| Sound feedback | Procedural Web Audio sci-fi tones |
| Cursor smoothing | EMA + velocity prediction |
| Calibration tool | Tune pinch thresholds for your camera |

---

## Gesture controls

| Gesture | Action |
|---------|--------|
| **Pinch** (thumb + index) | Left click |
| **Hold pinch** | Drag files/folders |
| **Release pinch** | Drop |
| **Index + middle up**, ring/pinky down | Scroll (tilt hand up/down) |
| **Swipe left/right** | Previous / next virtual desktop |
| **Closed fist** | Pause tracking & control |
| **Open palm** | Activate system |
| **Thumb + index ring** (other fingers up) | Right click |

---

## Project structure

```
gesture-os/
├── README.md                 # This guide
├── requirements.txt          # Python dependencies
├── config/
│   └── settings.json         # All tunables (FPS, thresholds, ports)
├── backend/
│   ├── main.py               # Vision loop + WebSocket broadcast
│   ├── config.py             # Settings loader
│   ├── tracking/
│   │   ├── hand_tracker.py   # MediaPipe wrapper
│   │   └── landmark_smoothing.py
│   ├── gestures/
│   │   ├── definitions.py    # Gesture enum + landmark indices
│   │   └── classifier.py     # Rule-based gesture AI
│   ├── control/
│   │   ├── mouse_controller.py
│   │   └── desktop_actions.py
│   ├── server/
│   │   └── websocket_server.py
│   └── utils/
│       └── calibration.py
├── frontend/
│   ├── main.js               # Electron transparent window
│   ├── preload.js
│   ├── index.html
│   ├── css/                  # HUD, boot, animations
│   └── js/                   # WebSocket, Three.js, GSAP, sounds
└── scripts/
    ├── start.ps1
    └── start.bat
```

---

## Installation (Windows)

### Prerequisites

- **Windows 10/11**
- **Python 3.10+** — [python.org](https://www.python.org/downloads/)
- **Node.js 18+** — [nodejs.org](https://nodejs.org/)
- **Webcam**
- Allow camera access when prompted

### 1. Clone / open project

```powershell
cd c:\Users\jktha\Projects\swayam-portfolio\gesture-os
```

### 2. Python backend

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 3. Electron HUD

```powershell
cd frontend
npm install
cd ..
```

---

## Run

### One-click (recommended)

```powershell
.\scripts\start.ps1
```

Or double-click `scripts\start.bat`.

### Manual (two terminals)

**Terminal 1 — vision backend:**

```powershell
cd gesture-os
.\venv\Scripts\Activate.ps1
python -m backend.main
```

**Terminal 2 — HUD overlay:**

```powershell
cd gesture-os\frontend
npm start
```

### Optional: debug camera window

In `config/settings.json`, set `"show_debug_window": true`, then restart the backend.

### Calibration

```powershell
python -m backend.utils.calibration
```

Adjust `pinch_threshold` and `right_click_threshold` in `config/settings.json` using printed percentiles.

---

## Module guide

### `backend/tracking/hand_tracker.py`

Captures MediaPipe 21-landmark hands, applies per-hand EMA smoothing to reduce jitter.

### `backend/gestures/classifier.py`

Rule-based “AI” gestures: finger extension checks, pinch distance, swipe velocity history, cooldowns.

### `backend/control/mouse_controller.py`

Maps normalized index tip → screen pixels with margin and sensitivity; handles click/drag/scroll.

### `backend/server/websocket_server.py`

Pushes JSON frames (`hands`, `gesture`, `fps`, `cursor`) to the Electron HUD at `ws://127.0.0.1:8765`.

### `frontend/js/`

- **app.js** — boot sequence, main loop
- **particles.js** — Three.js ambient field + finger trails
- **landmarks.js** — SVG skeleton overlay
- **sounds.js** — procedural UI audio
- **hud-ui.js** — GSAP-polished widgets

---

## Configuration

Edit `config/settings.json`:

| Key | Purpose |
|-----|---------|
| `camera_index` | Webcam device (0 = default) |
| `cursor_smoothing` | 0–1, lower = smoother, more lag |
| `cursor_sensitivity` | How far hand moves map to screen |
| `pinch_threshold` | Pinch distance (normalized) |
| `gesture_cooldown_ms` | Debounce desktop swipes / clicks |
| `enable_desktop_control` | `false` = HUD only, no mouse move |
| `fps_target` | Backend loop cap |

---

## Optimization tips

1. **Lighting** — face a light source; avoid backlighting.
2. **Distance** — sit 50–80 cm from the camera; keep hand in frame.
3. **FPS** — lower `frame_width` / `frame_height` to 480p if CPU-bound.
4. **Smoothing** — increase `cursor_smoothing` (e.g. `0.25`) if cursor shakes.
5. **Pinch** — run calibration; tighten `pinch_threshold` if false clicks.
6. **Safety** — PyAutoGUI failsafe: fling mouse to top-left corner to abort (if enabled).

---

## Future upgrades

- [ ] ML gesture model (TensorFlow Lite) instead of rules
- [ ] Multi-monitor coordinate mapping
- [ ] Voice commands layered on HUD
- [ ] macOS / Linux desktop shortcuts
- [ ] Recording & replay of gesture macros
- [ ] ONNX hand model for GPU inference
- [ ] Settings UI panel in Electron

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Webcam not found | Change `camera_index` to `1` or `2` |
| HUD empty / no hands | Ensure backend is running before Electron |
| No mouse movement | Set `enable_desktop_control`: `true` |
| Clicks while pinching to move | Increase `pinch_threshold` slightly |
| Drag doesn’t drop | Open hand fully to release pinch |
| Electron blank modules | Run `npm install` in `frontend/` |

---

## Security note

This software controls your **real mouse and keyboard**. Only run from trusted sources. Use `enable_desktop_control: false` to preview the HUD without system control.

---

## License

MIT — use freely for portfolio demos and learning.
