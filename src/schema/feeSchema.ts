import { z } from "zod";
import { sbCollectRegex } from "@/utils";

const addFeeSchema = z.object({
  sbCollRef: z
    .string()
    .regex(sbCollectRegex, "Invalid SB Collect Reference Number"),
  amount: z.string().transform(Number),
});

export { addFeeSchema };
