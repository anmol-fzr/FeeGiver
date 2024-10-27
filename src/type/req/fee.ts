import { addFeeSchema } from "@/schema";
import { z } from "zod";

type IReqAddFee = z.infer<typeof addFeeSchema>;

export type { IReqAddFee };
