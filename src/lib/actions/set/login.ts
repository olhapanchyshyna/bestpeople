
import { LoginSchema } from "@/lib/validations";
import { z } from "zod";

import { getUserByEmail } from "../get/get-user-by-email";
import { signIn } from 'next-auth/react'

export const logIn = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User with this email not found" };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    // Возвращаем простой объект с результатом
    return { success: "success" };
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    return { error: String(error) }; // Возвращаем строку ошибки
  }
};
