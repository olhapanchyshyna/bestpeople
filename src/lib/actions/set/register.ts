"use server";

import prisma from "@/lib/db";
import { RegisterShema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUserByEmail } from "../get/get-user-by-email";
import { getErrorMessage } from '@/lib/utils'

export const register = async (values: z.infer<typeof RegisterShema>) => {
  const validatedFields = RegisterShema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) {
    return { error: "User with this email already exists" };
  }

  try {
    await prisma.userBest.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "success" };
  } catch (e) {
    return { error: getErrorMessage(e) };
  }
};
