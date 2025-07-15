import { axiosInst } from "@/config/axiosConfig";
import { IReqLogin, IReqSignUp } from "@/type/req";
import { IResLogin, IResSignUp } from "@/type/res";

const AUTH = {
	LOGIN: (data: IReqLogin) =>
		axiosInst.post<IReqLogin, IResLogin>(`/auth/login`, data),
	SIGNUP: (data: IReqSignUp) =>
		axiosInst.post<IReqSignUp, IResSignUp>(`/auth/register`, data),
} as const;

export { AUTH };
