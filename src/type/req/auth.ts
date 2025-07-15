import { loginSchema, signUpSchema } from "@/schema/authSchema";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

type IReqLogin = z.infer<typeof loginSchema>;
type IReqSignUp = Pick<SignUpFormData, "email" | "password">;

export type { IReqLogin, IReqSignUp };
