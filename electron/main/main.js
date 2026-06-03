const { app } = require("electron");
const axios = require("axios");
require("dotenv").config();

const setAppMenu = require("../menu/menuBuilder").setAppMenu;
const { setLoginStatus } = require("../menu/menuBuilder");

const createWindow = require("./window");

app.whenReady().then(async () => {
  try {
    console.log("🚀 App starting...");

    // 1. Default menu (logged out state)
    setAppMenu(app);

    // 2. Create window
    createWindow();

    // 3. Load IPC handlers
    require("../ipc/auth.ipc")(app);

    // 4. AUTO AUTH CHECK (clean + no timeout)
    const store = require("../utils/store");
    const token = store.get("token");

    console.log("🔐 Stored token:", token ? "FOUND" : "NOT FOUND");

    if (!token) return;

    const res = await axios.get(
      `${process.env.API_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.success) {
      console.log("✅ Auto-login success");

      setLoginStatus(true, app);
    } else {
      console.log("❌ Auto-login failed");
      setLoginStatus(false, app);
    }

  } catch (err) {
    console.error("❌ Startup auth error:", err.message);
    setLoginStatus(false, app);
  }
});