import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthStore } from "./types";
import { createJSONStorage } from "zustand/middleware";

const creds: IAuthStore["creds"] = {
  isLogin: false,
  token: "",
  email: "",
};

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      creds,
      resetCreds: () => set({ creds }),
      updateCreds: (creds) => set({ creds: { ...get().creds, ...creds } }),
    }),
    { name: "useAuthStore", storage: createJSONStorage(() => localStorage) },
  ),
);

export { useAuthStore };
