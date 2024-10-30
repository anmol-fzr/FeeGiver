import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProfileStore } from "./types";
import { createJSONStorage } from "zustand/middleware";

const profile: IProfileStore["profile"] = {
  name: "",
  mobile: 0,
  admissionNo: 0,
  rollNo: 0,
  batch: 0,
};

const useProfileStore = create<IProfileStore>()(
  persist(
    (set, get) => ({
      profile,
      isFormOpen: false,

      updateIsFormOpen: (isOpen) => set({ isFormOpen: isOpen }),
      updateProfile: (creds) =>
        set({ profile: { ...get().profile, ...creds } }),
      resetProfile: () => set({ profile }),
    }),
    { name: "useProfileStore", storage: createJSONStorage(() => localStorage) },
  ),
);

export { useProfileStore };
