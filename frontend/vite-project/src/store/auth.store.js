import { create } from "zustand";
import { loginUser } from "../api/auth.api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.data.accessToken);

      set({
        user: res.data.user,
        token: res.data.accessToken,
        loading: false,
      });

    } catch (err) {
      set({ loading: false });
      throw err.response?.data?.message;
    }
  },
}));