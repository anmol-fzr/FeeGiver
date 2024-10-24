import { axiosInst } from "@/config/axiosConfig";
import { IReqLogin, IReqOnBoard, IReqSignUp } from "@/type/req";
import { IResLogin, IResOnBoard, IResSignUp } from "@/type/res";

const AUTH = {
  LOGIN: (data: IReqLogin) =>
    axiosInst.post<IReqLogin, IResLogin>(`/student/login`, data),
  SIGNUP: (data: IReqSignUp) =>
    axiosInst.post<IReqSignUp, IResSignUp>(`/student/register`, data),
  ONBOARD: (data: IReqOnBoard) =>
    axiosInst.post<IReqOnBoard, IResOnBoard>(`/student/onboard`, data),
};

export { AUTH };
