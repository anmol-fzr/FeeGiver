import { PageHeader, OpenFormAlert, FeesTable } from "@/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useIsFormOpen } from "@/hooks";
import { useProfile } from "@/hooks/useProfile";

const HomePage = () => {
  const isFormOpen = useIsFormOpen();
  const [animateRef] = useAutoAnimate();

  const { isLoading, data } = useProfile();

  const name = data?.data.name;

  return (
    <div className="w-full space-y-4">
      {/*
      {isFormOpen && name && <OpenFormAlert name={name} />}
      */}
      {isLoading ? (
        <PageHeader.Loading />
      ) : (
        <PageHeader
          title={`Welcome ${name}`}
          desc="These are your Previously filled fee data"
        />
      )}
      <FeesTable />
    </div>
  );
};

export { HomePage };
