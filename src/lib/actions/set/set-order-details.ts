"use server";

import prisma from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { OrderDetails } from "@/types/types";

export const setOrderDetails = async (
  userId: number | string | undefined,
  details: OrderDetails,
): Promise<boolean> => {
  if (!userId) {
    return false;
  }
  try {
    await prisma.userBest.update({
      where: {
        id: +userId,
      },
      data: {
        orderDetails: JSON.stringify(details),
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to set goods basket:", getErrorMessage(error));
    return false;
  }
};
