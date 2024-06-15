"use server";

import { getErrorMessage } from '@/lib/utils'
import prisma from "../../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.userBest.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (e) {
    console.error("Failed to get goods basket:", getErrorMessage(e));
		return null;
  }
};
