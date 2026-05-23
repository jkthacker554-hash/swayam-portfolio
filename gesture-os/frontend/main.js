/**
 * Electron main process — fullscreen transparent HUD overlay.
 */
const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

let hudWindow = null;

function createHUD() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  hudWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    fullscreen: false,
    focusable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  hudWindow.setIgnoreMouseEvents(true, { forward: true });
  hudWindow.setAlwaysOnTop(true, "screen-saver");
  hudWindow.loadFile(path.join(__dirname, "index.html"));

  if (process.argv.includes("--enable-logging")) {
    hudWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createHUD();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("set-click-through", (_e, enabled) => {
  if (hudWindow) hudWindow.setIgnoreMouseEvents(enabled, { forward: true });
});
