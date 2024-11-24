import { Link, PageHeader } from "@/components";
import { useRouteParam } from "@/hooks";
import { ChevronLeft } from "lucide-react";
import { FeeDetails } from "@/components/custom/FeeDetails";

const FeePage = () => {
	const feeId = useRouteParam("feeId");

	return (
		<div className="flex flex-col w-full items-start">
			<Link to="/">
				<ChevronLeft />
				Go Back
			</Link>
			<div className="w-full flex flex-col gap-12">
				<PageHeader title="Fee Data" desc="" />
				<FeeDetails feeId={feeId} />
			</div>
		</div>
	);
};

export { FeePage };
