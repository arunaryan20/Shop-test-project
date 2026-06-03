const { ipcMain } = require("electron");
const axios = require("axios");
const store = require("../utils/store");
const { setLoginStatus } = require("../menu/menuBuilder");
require("dotenv").config();

module.exports = (app) => {
  // =========================
  // 1. SAVE TOKEN
  // =========================
  ipcMain.handle("auth:set-token", async (event, token) => {
    try {
      store.set("token", token);

      const savedToken = store.get("token");

      if (savedToken !== token) {
        return {
          success: false,
          message: "Token save verification failed",
        };
      }

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  });

  // =========================
  // 2. VERIFY TOKEN
  // =========================
  ipcMain.handle("auth:verify-token", async () => {
    try {
      const token = store.get("token");
      if (!token) {
        setLoginStatus(false, app);
        return { valid: false };
      }
      const API_URL = process.env.API_URL || "http://localhost:8000/api";
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API_URL =>", process.env.API_URL);

      if (res.data?.success) {
        setLoginStatus(true, app);

        return {
          valid: true,
          user: res.data.user,
        };
      }
      setLoginStatus(false, app);

      return { valid: false };
    } catch (err) {
      setLoginStatus(false, app);

      return { valid: false };
    }
  });

  // =========================
  // 3. LOGOUT
  // =========================
  ipcMain.handle("auth:logout", async () => {
    try {
      store.delete("token");
      setLoginStatus(false, app);
      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  });
};
