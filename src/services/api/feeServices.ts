import { axiosInst } from "@/config/axiosConfig";
import { IResGetFee, IResGetSingleFee } from "@/type/res";
import { IReqAddFee } from "@/type/req";

const uri = `/fee`;

const FEE = {
  GET: () => axiosInst.get<IResGetFee>(uri),
  ONE: (feeId: string) =>
    axiosInst.get<IResGetSingleFee, IResGetSingleFee>(`${uri}/${feeId}`),
  ADD: (data: IReqAddFee) => axiosInst.post<IReqAddFee, IResGetFee>(uri, data),
  //UPDATE: (data: IReqUpdateProfile) =>
  //  axiosInst.patch<IReqUpdateProfile, IResUpdateProfile>(uri, data),
} as const;

export { FEE };
