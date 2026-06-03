// const {contextBridge}=require("electron");

// contextBridge.executeInMainWorld("electron",{});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  setToken: (token) => ipcRenderer.invoke("auth:set-token", token),
  verifyToken: () => ipcRenderer.invoke("auth:verify-token"),
  logout: () => ipcRenderer.invoke("auth:logout"),
});
