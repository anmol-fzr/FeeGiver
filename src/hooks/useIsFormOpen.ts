import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { fbRealTimeDB } from "@/config/fbConfig";
import { useProfileStore } from "@/store";

const { updateIsFormOpen } = useProfileStore.getState();

const useIsFormOpen = () => {
  const isFormOpen = useProfileStore((state) => state.isFormOpen);

  useEffect(() => {
    const settingsRef = ref(fbRealTimeDB);
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      updateIsFormOpen(data.settings.isFormOpen);
    });
  }, []);

  return isFormOpen;
};

export { useIsFormOpen };
