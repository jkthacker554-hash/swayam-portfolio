import { gsap } from "gsap";

const GESTURE_LABELS = {
  none: "TRACKING",
  open_palm: "ACTIVATED",
  pinch: "CLICK",
  pinch_hold: "DRAG",
  right_click: "RIGHT CLICK",
  scroll_up: "SCROLL ↑",
  scroll_down: "SCROLL ↓",
  swipe_left: "DESKTOP ←",
  swipe_right: "DESKTOP →",
  fist: "PAUSED",
  paused: "STANDBY",
  three_finger: "COPY",
  four_finger: "PASTE",
  thumbs_up: "DESKTOP",
};

export class HUDUI {
  constructor(soundEngine) {
    this.sound = soundEngine;
    this.els = {
      hud: document.getElementById("hud"),
      gestureName: document.getElementById("gesture-name"),
      statusActive: document.getElementById("status-active"),
      statusFps: document.getElementById("status-fps"),
      handCount: document.getElementById("hand-count"),
      handConfidence: document.getElementById("hand-confidence"),
      latencyMs: document.getElementById("latency-ms"),
      historyList: document.getElementById("gesture-history-list"),
      reticle: document.getElementById("reticle"),
      ringOuter: document.getElementById("ring-outer"),
    };
    this._lastGesture = "";
  }

  showHUD() {
    this.els.hud.classList.remove("hidden");
    gsap.fromTo(this.els.hud, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
  }

  update(frame) {
    const { gesture, fps, active, cursor, hands, latency_ms, gesture_history, calibration, macro } = frame;

    this.els.statusFps.textContent = `${fps} FPS`;
    this.els.handCount.textContent = String(hands?.length ?? 0);
    if (latency_ms != null) {
      this.els.latencyMs.textContent = `${latency_ms} ms`;
    }

    const conf = hands?.length > 0 ? `${Math.round(hands[0].confidence * 100)}%` : "—";
    this.els.handConfidence.textContent = conf;

    this.els.statusActive.textContent = active ? "ONLINE" : "STANDBY";
    this.els.statusActive.classList.toggle("active", active);

    const label = GESTURE_LABELS[gesture] || gesture?.toUpperCase?.() || "—";
    if (gesture !== this._lastGesture) {
      this.els.gestureName.textContent = label;
      this.els.gestureName.classList.remove("pulse");
      void this.els.gestureName.offsetWidth;
      this.els.gestureName.classList.add("pulse");
      this.sound.onGesture(gesture);
      this._lastGesture = gesture;
      gsap.fromTo(this.els.ringOuter, { scale: 1 }, { scale: 1.02, duration: 0.3, yoyo: true, repeat: 1 });
    }

    if (gesture_history?.length && this.els.historyList) {
      this.els.historyList.innerHTML = gesture_history
        .slice(0, 6)
        .map((g) => `<li>${GESTURE_LABELS[g] || g}</li>`)
        .join("");
    }

    if (cursor?.x != null) {
      this.els.reticle.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
    }

    return { calibration, macro };
  }
}
