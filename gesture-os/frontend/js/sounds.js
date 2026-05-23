/**
 * Procedural sci-fi UI sounds via Web Audio API (no external assets).
 */
export class SoundEngine {
  constructor() {
    this.enabled = true;
    this._ctx = null;
    this._lastGesture = null;
  }

  _ensureContext() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === "suspended") {
      this._ctx.resume();
    }
    return this._ctx;
  }

  setEnabled(on) {
    this.enabled = on;
  }

  playTone(freq, duration = 0.08, type = "sine", gain = 0.08) {
    if (!this.enabled) return;
    const ctx = this._ensureContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  onGesture(gesture) {
    if (gesture === this._lastGesture) return;
    this._lastGesture = gesture;

    const map = {
      pinch: () => this.playTone(880, 0.06),
      pinch_hold: () => this.playTone(440, 0.04, "triangle", 0.04),
      right_click: () => {
        this.playTone(520, 0.05);
        setTimeout(() => this.playTone(780, 0.05), 50);
      },
      scroll_up: () => this.playTone(600, 0.03),
      scroll_down: () => this.playTone(500, 0.03),
      swipe_left: () => this.playTone(300, 0.12, "sawtooth", 0.05),
      swipe_right: () => this.playTone(350, 0.12, "sawtooth", 0.05),
      open_palm: () => this.playTone(1200, 0.15, "sine", 0.06),
      fist: () => this.playTone(200, 0.2, "square", 0.04),
      three_finger: () => this.playTone(700, 0.08),
      four_finger: () => this.playTone(900, 0.08),
      thumbs_up: () => this.playTone(1100, 0.12, "sine", 0.07),
    };
    if (map[gesture]) map[gesture]();
  }
}
