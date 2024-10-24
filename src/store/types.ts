import { StudentProfileDetails } from "@/type/res";

type IAuthStoreState = {
  creds: {
    token: string | null;
    isLogin: boolean;
  };
};

type IAuthStoreActions = {
  updateCreds: (creds: Partial<IAuthStoreState["creds"]>) => void;
  resetCreds: () => void;
};

type IAuthStore = IAuthStoreState & IAuthStoreActions;

type IProfileStoreState = {
  profile: StudentProfileDetails;
};

type IProfileStoreActions = {
  updateProfile: (creds: Partial<IProfileStoreState["profile"]>) => void;
  resetProfile: () => void;
};

type IProfileStore = IProfileStoreState & IProfileStoreActions;

export type { IAuthStore, IProfileStore };
