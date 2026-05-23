const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gestureOS", {
  setClickThrough: (enabled) => ipcRenderer.send("set-click-through", enabled),
});
