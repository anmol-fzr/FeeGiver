import { IRes } from ".";

type Fee = {
  _id: string;
  sbCollRef: string;
  amount: number;
  sem: number;
  feeType: string;
  hostelFeeAmount: number;
  securityAmount: number;
  fineAmount: number;
  rejection: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
};

type IResGetFee = IRes<Fee[]>;
type IResGetSingleFee = IRes<Fee>;

export type { IResGetFee, IResGetSingleFee };
export type { Fee };
