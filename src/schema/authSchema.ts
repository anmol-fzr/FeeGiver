import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be of atleast 5 characters"),
});

export { loginSchema };
