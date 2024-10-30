import { PageHeader } from "@/components";
import { useRouteParam } from "@/hooks";
import { API } from "@/services";
import { useQuery } from "@tanstack/react-query";

const FeePage = () => {
  const feeId = useRouteParam("feeId");

  const { isLoading, data } = useQuery({
    queryKey: ["FEE", feeId] as const,
    queryFn: ({ queryKey }) => API.FEE.ONE(queryKey[1]),
  });

  return (
    <div className="w-full flex flex-col gap-12">
      <PageHeader title="Fee Data" desc="" />
    </div>
  );
};

export { FeePage };
