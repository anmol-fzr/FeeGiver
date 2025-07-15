import { z } from "zod";

const emailSchema = z.string().email();

const loginSchema = z.object({
	email: emailSchema,
	otp: z.coerce
		.number({
			invalid_type_error: "Enter a Valid OTP",
		})
		.optional()
		.nullable(),
});

const stuOnboardSchema = z.object({
	name: z
		.string({ message: "Enter a valid Name" })
		.min(2, "Enter a Valid Name"),
	mobile: z.coerce
		.string()
		.length(10, "Mobile Number must be of exact 10 digits"),
	admissionNo: z.coerce
		.string()
		.min(8, "Admission Number must be of 8 digits")
		.max(8, "Admission Number must be of 8 digits"),
	rollNo: z.coerce
		.string()
		.min(6, "Roll Number must be of 6 digits")
		.max(6, "Roll Number must be of 6 digits"),
	batch: z.string({ required_error: "Batch is required" }).min(4).max(4),
});

const signUpSchema = z
	.object({
		email: emailSchema,
		image: z.string().optional(),
	})
	.and(stuOnboardSchema);

export { loginSchema, signUpSchema, stuOnboardSchema };
