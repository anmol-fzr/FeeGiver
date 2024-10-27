import { axiosInst } from "@/config/axiosConfig";
import { IResGetFee } from "@/type/res";
import { IReqAddFee } from "@/type/req";

const uri = `/fee`;

const FEE = {
  GET: () => axiosInst.get<IResGetFee>(uri),
  ADD: (data: IReqAddFee) => axiosInst.post<IReqAddFee, IResGetFee>(uri, data),
  //UPDATE: (data: IReqUpdateProfile) =>
  //  axiosInst.patch<IReqUpdateProfile, IResUpdateProfile>(uri, data),
} as const;

export { FEE };
