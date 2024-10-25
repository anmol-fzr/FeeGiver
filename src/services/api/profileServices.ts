import { axiosInst } from "@/config/axiosConfig";
import { IReqCreateProfile, IReqUpdateProfile } from "@/type/req";
import { IResGetProfile, IResOnBoard, IResUpdateProfile } from "@/type/res";

const uri = `/profile`;

const PROFILE = {
  GET: () => axiosInst.get<IResGetProfile>(uri),
  CREATE: (data: IReqCreateProfile) =>
    axiosInst.post<IReqCreateProfile, IResOnBoard>(uri, data),
  UPDATE: (data: IReqUpdateProfile) =>
    axiosInst.patch<IReqUpdateProfile, IResUpdateProfile>(uri, data),
} as const;

export { PROFILE };
