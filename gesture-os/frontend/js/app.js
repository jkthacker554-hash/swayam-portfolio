import { gsap } from "gsap";
import { HUDSocket } from "./websocket.js";
import { ParticleSystem } from "./particles.js";
import { LandmarkRenderer } from "./landmarks.js";
import { SoundEngine } from "./sounds.js";
import { HUDUI } from "./hud-ui.js";
import { SettingsPanel } from "./settings-panel.js";

const BOOT_STEPS = [
  { pct: 15, text: "Loading neural mesh..." },
  { pct: 35, text: "Linking vision pipeline..." },
  { pct: 55, text: "Gesture prediction online..." },
  { pct: 75, text: "Multi-monitor map ready..." },
  { pct: 92, text: "Awaiting backend stream..." },
  { pct: 100, text: "Press Tab for advanced config." },
];

async function runBootSequence() {
  const screen = document.getElementById("boot-screen");
  const bar = document.getElementById("boot-bar");
  const status = document.getElementById("boot-status");
  for (const step of BOOT_STEPS) {
    bar.style.width = `${step.pct}%`;
    status.textContent = step.text;
    await new Promise((r) => setTimeout(r, 400));
  }
  await gsap.to(screen, { opacity: 0, duration: 1, delay: 0.2 });
  screen.classList.add("done");
}

function main() {
  const canvas = document.getElementById("particle-canvas");
  const svg = document.getElementById("landmark-svg");

  const sound = new SoundEngine();
  const particles = new ParticleSystem(canvas);
  const landmarks = new LandmarkRenderer(svg, particles);
  const ui = new HUDUI(sound);

  function animate() {
    particles.tick();
    requestAnimationFrame(animate);
  }
  animate();

  const socket = new HUDSocket(
    (frame) => {
      if (frame.mirror_hud !== undefined) landmarks.setMirror(frame.mirror_hud);
      const meta = ui.update(frame);
      landmarks.render(frame.hands || []);

      if (frame.settings) settings.applySettings(frame.settings);
      if (meta?.calibration) {
        if (meta.calibration.calibrating) {
          settings.setCalibStatus(`Pinching… ${meta.calibration.remaining_s}s (${meta.calibration.samples} samples)`);
        } else if (meta.calibration.pinch_threshold) {
          settings.setCalibStatus(`Done — pinch ${meta.calibration.pinch_threshold}`);
          settings.applySettings({ pinch_threshold: meta.calibration.pinch_threshold });
        } else if (meta.calibration.error) {
          settings.setCalibStatus(meta.calibration.error);
        }
      }
      if (meta?.macro) settings.setMacroStatus(meta.macro);
    },
    (s) => settings.applySettings(s)
  );

  const settings = new SettingsPanel(socket);

  runBootSequence().then(() => ui.showHUD());
  socket.connect();

  if (window.gestureOS?.setClickThrough) {
    window.gestureOS.setClickThrough(true);
  }
}

main();
