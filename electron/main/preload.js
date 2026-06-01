    const {contextBridge}=require("electron");

    contextBridge.executeInMainWorld("electron",{});