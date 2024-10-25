import { z } from "zod";

const isNumValid = (val: number) => !Number.isNaN(val);

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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: passSchema,
    confirmPassword: passSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

const stuOnboardSchema = z.object({
  name: z.string().min(2),
  mobile: z.string().length(10, "Mobile Number must be of exact 10 digits"),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Mobile Number" }),
  admissionNo: z
    .string()
    .min(4, "Admission Number must be of atleast 4 digits")
    .max(8, "Admission Number must be of atmost 8 digits"),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Admission Number" }),
  rollNo: z.string().min(4).max(8),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Roll Number" }),
  batch: z.string().min(4).max(4),
  //.transform(Number)
  //.refine(isNumValid, { message: "Invalid Batch Year" }),
});

export { loginSchema, signUpSchema, stuOnboardSchema };
