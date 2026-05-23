/**
 * Live settings panel — Tab to toggle. Sends patches to Python backend.
 */
export class SettingsPanel {
  constructor(socket) {
    this.socket = socket;
    this.panel = document.getElementById("settings-panel");
    this.open = false;
    this._bind();
  }

  _bind() {
    const sliders = this.panel?.querySelectorAll("[data-setting]");
    sliders?.forEach((el) => {
      const fire = () => {
        const key = el.dataset.setting;
        const val = el.type === "checkbox" ? el.checked : parseFloat(el.value);
        el.nextElementSibling?.textContent && (el.nextElementSibling.textContent = String(val));
        const label = el.parentElement?.querySelector(".val");
        if (label) label.textContent = String(val);
        this.socket.updateSettings({ [key]: val });
      };
      el.addEventListener("input", fire);
      el.addEventListener("change", fire);
    });

    document.getElementById("btn-calibrate")?.addEventListener("click", () => {
      this.socket.sendCommand("calibrate_pinch", { duration: 6 });
      document.getElementById("calib-status").textContent = "Calibrating — pinch 6s...";
    });

    document.getElementById("btn-macro-rec")?.addEventListener("click", () => {
      this.socket.sendCommand("macro_record_start");
    });
    document.getElementById("btn-macro-stop")?.addEventListener("click", () => {
      this.socket.sendCommand("macro_record_stop");
    });
    document.getElementById("btn-macro-play")?.addEventListener("click", () => {
      this.socket.sendCommand("macro_play");
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.open = !this.open;
    this.panel?.classList.toggle("open", this.open);
    if (window.gestureOS?.setClickThrough) {
      window.gestureOS.setClickThrough(!this.open);
    }
  }

  applySettings(s) {
    if (!s || !this.panel) return;
    this.panel.querySelectorAll("[data-setting]").forEach((el) => {
      const key = el.dataset.setting;
      if (s[key] === undefined) return;
      if (el.type === "checkbox") el.checked = !!s[key];
      else el.value = s[key];
      const label = el.parentElement?.querySelector(".val");
      if (label) label.textContent = String(s[key]);
    });
  }

  setCalibStatus(msg) {
    const el = document.getElementById("calib-status");
    if (el) el.textContent = msg;
  }

  setMacroStatus(macro) {
    const el = document.getElementById("macro-status");
    if (!el || !macro) return;
    const mode = macro.recording ? "REC" : macro.playing ? "PLAY" : "—";
    el.textContent = `${mode} · ${macro.events} events`;
  }
}
