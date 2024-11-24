import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthStore } from "./types";
import { createJSONStorage } from "zustand/middleware";
import { registerStore } from "@/utils";

const creds: IAuthStore["creds"] = {
	token: "",
	email: "",
	authState: "logged-out",
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

registerStore(useAuthStore, "useAuthStore");

export { useAuthStore };
