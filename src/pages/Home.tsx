import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";
import { PageHeader, OpenFormAlert, FeesTable } from "@/components";
import { ref, onValue } from "firebase/database";
import { fbRealTimeDB } from "@/config/fbConfig";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useProfileStore } from "@/store";

const { updateIsFormOpen } = useProfileStore.getState();

const HomePage = () => {
  const isFormOpen = useProfileStore((state) => state.isFormOpen);
  const [animateRef] = useAutoAnimate();

  useEffect(() => {
    const settingsRef = ref(fbRealTimeDB);
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      updateIsFormOpen(data.settings.isFormOpen);
    });
  }, []);

  const { data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
  });

  const name = data?.data.name;

  return (
    <div className="w-full space-y-4" ref={animateRef}>
      {isFormOpen && name && <OpenFormAlert name={name} />}
      <PageHeader
        title={`Welcome ${name}`}
        desc="These are your Previously filled fee data"
      />
      <FeesTable />
    </div>
  );
};

export { HomePage };
