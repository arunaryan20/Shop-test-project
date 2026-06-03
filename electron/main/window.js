const { BrowserWindow, app } = require("electron");
require("dotenv").config();

const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(
      path.join(
        __dirname,
        "../../frontend/vite-project/dist/index.html"
      )
    );
  } else {
    win.loadURL(process.env.FRONTEND_URL);
  }

  return win;
}

module.exports = createWindow;