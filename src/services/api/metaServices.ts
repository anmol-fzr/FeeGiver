import { axiosInst } from "@/config/axiosConfig";
import { IResGetFeeTypes } from "@/type/res";

const uri = `/meta`;

export const META = {
	FEE_TYPE: () => axiosInst.get<IResGetFeeTypes>(`${uri}/fee-type`),
} as const;
