import { StudentProfileDetails } from "@/type/res";

type IAuthStoreState = {
	creds: {
		token: string;
		email: string;
		authState: "logged-in" | "logged-out" | "onboarding";
	};
};

type IAuthStoreActions = {
	updateCreds: (creds: Partial<IAuthStoreState["creds"]>) => void;
	resetCreds: () => void;
};

type IAuthStore = IAuthStoreState & IAuthStoreActions;

type IProfileStoreState = {
	isFormOpen: boolean;
	profile: StudentProfileDetails;
};

type IProfileStoreActions = {
	updateProfile: (creds: Partial<IProfileStoreState["profile"]>) => void;
	updateIsFormOpen: (isOpen: IProfileStoreState["isFormOpen"]) => void;
	resetProfile: () => void;
};

type IProfileStore = IProfileStoreState & IProfileStoreActions;

export type { IAuthStore, IProfileStore };
