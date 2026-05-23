const WS_URL = "ws://127.0.0.1:8765";

export class HUDSocket {
  constructor(onFrame, onConfig) {
    this.onFrame = onFrame;
    this.onConfig = onConfig;
    this.ws = null;
    this.connected = false;
    this._reconnectDelay = 1500;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      this.connected = true;
      console.log("[HUD] Connected");
    };

    this.ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "frame") this.onFrame(data);
        if (data.type === "config" && this.onConfig) this.onConfig(data.settings);
        if (data.type === "ack" && this.onConfig && data.settings) {
          this.onConfig(data.settings);
        }
      } catch (e) {
        console.warn("[HUD] Bad message", e);
      }
    };

    this.ws.onclose = () => {
      this.connected = false;
      setTimeout(() => this.connect(), this._reconnectDelay);
    };

    this.ws.onerror = () => this.ws?.close();
  }

  sendCommand(action, extra = {}) {
    if (this.ws?.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type: "command", action, ...extra }));
  }

  updateSettings(patch) {
    this.sendCommand("update_settings", { patch });
  }

  disconnect() {
    this.ws?.close();
  }
}
