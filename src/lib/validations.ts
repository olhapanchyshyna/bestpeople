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

export const CustomerDetailsForOrder = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "phone must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "email must be a valid email address.",
  }),
  message: z.string().optional(),
});
