import { z } from "zod";
import { orgEmailRegex } from "@/utils";

//const isNumValid = (val: number) => !Number.isNaN(val);

const passSchema = z
  .string()
  .min(8, { message: "Password must be of atleast 8 characters" })
  .max(20, { message: "Password must be of atmost 20 characters" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain atleast 1 Uppercase character",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain atleast 1 Lowercase character",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain atleast 1 number",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message:
      "Password must contain atleast on of these special characters !@#$%^&*",
  });

const emailSchema = z
  .string()
  .email()
  .regex(orgEmailRegex, "Please provived Email given by College");

const loginSchema = z.object({
  email: emailSchema,
  otp: z.coerce.number().optional().nullable(),
  //password: z.string(),
});

const stuOnboardSchema = z.object({
  name: z
    .string({ message: "Enter a valid Name" })
    .min(2, "Enter a Valid Name"),
  mobile: z.coerce
    .string()
    .length(10, "Mobile Number must be of exact 10 digits"),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Mobile Number" }),
  admissionNo: z.coerce
    .string()
    .min(8, "Admission Number must be of 8 digits")
    .max(8, "Admission Number must be of 8 digits"),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Admission Number" }),
  rollNo: z.coerce
    .string()
    .min(6, "Roll Number must be of 6 digits")
    .max(6, "Roll Number must be of 6 digits"),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Roll Number" }),
  batch: z.string({ required_error: "Batch is required" }).min(4).max(4),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Batch Year" }),
});

const signUpSchema = z
  .object({
    email: emailSchema,
    image: z.string().optional(),
    //password: passSchema,
    //confirmPassword: passSchema,
  })
  .and(stuOnboardSchema);

export { loginSchema, signUpSchema, stuOnboardSchema };
