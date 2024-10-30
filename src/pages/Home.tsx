import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";
import { PageHeader } from "@/components";
import { OpenFormAlert, FeesTable } from "@/components";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { fbRealTimeDB } from "@/config/fbConfig";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const HomePage = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [animateRef] = useAutoAnimate();

  useEffect(() => {
    const settingsRef = ref(fbRealTimeDB);
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data.settings);
    });
  }, []);

  const { data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
  });

  const name = data?.data.details.name;

  return (
    <div className="w-full space-y-4" ref={animateRef}>
      {settings.isFormOpen && <OpenFormAlert name={name} />}
      <PageHeader
        title={`Welcome ${name}`}
        desc="These are your Previously filled fee data"
      />
      <FeesTable />
    </div>
  );
};

export { HomePage };
