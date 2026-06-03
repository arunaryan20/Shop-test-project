import { create } from "zustand";
import { loginUser, registerUser } from "../api/auth.api";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  role: [],
  login: async (data) => {
    set({ loading: true });

    try {
      // 1. Backend Login
      const res = await loginUser(data);
      const token = res?.data?.data?.accessToken;

      // 2. Save token in Electron
      const saveResult = await window.electron.setToken(token);

      if (!saveResult?.success) {
        throw new Error("Failed to save token in Electron");
      }

      // 3. Verify token through Electron
      const verifyResult = await window.electron.verifyToken();

      if (!verifyResult?.valid) {
        throw new Error("Electron token verification failed");
      }

      // 4. Everything successful
      localStorage.setItem("token", token);

      set({
        user: res?.data?.data?.user,
        token,
        loading: false,
      });

      toast.success("Login successful");

      return res;
    } catch (err) {
      localStorage.removeItem("token");

      // Optional cleanup
      try {
        await window.electron.logout();
      } catch {}

      toast.error(
        err?.message || err?.response?.data?.message || "Login failed",
      );

      return null;
    } finally {
      set({ loading: false });
    }
  },

  // login: async (data) => {
  //   set({ loading: true });

  //   try {
  //     const res = await loginUser(data);
  //     localStorage.setItem("token", res?.data?.data?.accessToken);
  //     set({
  //       user: res?.data?.data?.user,
  //       token: res?.data?.data?.accessToken,
  //       loading: false,
  //     });
  //     await window.electron.setToken(res?.data?.data?.accessToken);
  //     await window.electron.verifyToken();
  //     toast.success("Login successful");
  //     return res;
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message || "Login failed");
  //     return null;
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  registerUser: async (data) => {
    set({ loading: true });
    try {
      const res = await registerUser(data);
      toast.success("Registration successful");
      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
