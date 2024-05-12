"use server";

import { LoginSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/lib/auth";
import { getUserByEmail } from "../get/get-user-by-email";

export const logIn = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User with this email does not exist" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
