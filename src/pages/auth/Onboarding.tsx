import { OnboardingForm } from "@/components";
import { Page } from "@/components";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
	const isOnboarding =
		useAuthStore((state) => state.creds.authState) === "onboarding";
	const navigate = useNavigate();

	useEffect(() => {
		if (!isOnboarding) {
			navigate("/");
		}
	}, [isOnboarding, navigate]);

	return (
		<Page className="min-h-[100dvh] py-12">
			<OnboardingForm />
		</Page>
	);
};

export { OnboardingPage };
