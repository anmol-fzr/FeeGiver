import { PageHeader } from "@/components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store";
import { FeeAddForm } from "@/components";

const useProtectFeeAdd = () => {
	const isFormOpen = useProfileStore((state) => state.isFormOpen);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isFormOpen) {
			navigate("/");
		}
	}, [isFormOpen, navigate]);
};

const FeeAddPage = () => {
	useProtectFeeAdd();

	return (
		<div className="w-full flex flex-col gap-12 pb-6">
			<PageHeader
				title="Add Fee Data"
				desc="Submit your latest paid fees data."
			/>
			<FeeAddForm />
		</div>
	);
};

export { FeeAddPage };
