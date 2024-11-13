import { z } from "zod";
import { sbCollectRegex } from "@/utils";

const feeAmntSchema = (label: string) =>
  z
    .number({
      invalid_type_error: `${label} must be a number`,
    })
    .safe()
    .max(999999);

const boolSchema = (label: string) =>
  z.enum(["true", "false"], {
    errorMap: () => ({ message: `${label} is Required` }),
  });

const addFeeSchema = z
  .object({
    sbCollRef: z
      .string()
      .regex(sbCollectRegex, "Invalid SB Collect Reference Number"),
    amount: feeAmntSchema("Amount").positive("Amount must be greater than 0"),
    sem: z.string({ message: "Semester is Required" }),
    feeType: z.string({ message: "Fee Type is Required" }),
    hostelFeeAmount: feeAmntSchema("Hostel Fee Amount"),
    otherFeeType: z.string().optional(),
    securityAmount: feeAmntSchema("Security Fee Amount"),
    fineAmount: feeAmntSchema("Fine Amount"),
    pdf: z.any(),
  })
  .superRefine(({ otherFeeType, feeType }, refinementContext) => {
    if (feeType === "Any Other" && !otherFeeType) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specify Fee Type Here",
        path: ["otherFeeType"],
      });
    }
  });

export { addFeeSchema };
