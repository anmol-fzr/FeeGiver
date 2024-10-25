import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";
import { PageHeader } from "@/components";
import { OpenFormAlert, FeesTable } from "@/components";

const HomePage = () => {
  const { data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
  });

  const name = data?.data.details.name;

  return (
    <div className="w-full space-y-4">
      <OpenFormAlert name={name} />
      <PageHeader
        title={`Welcome ${name}`}
        desc="These are your Previously filled fee data"
      />
      <FeesTable />
    </div>
  );
};

export { HomePage };
