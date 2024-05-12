import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6),
});

export const RegisterShema = z.object({
	name: z.string().min(3).max(100),
  email: z.string().email().max(100),
  password: z.string().min(6),
});
