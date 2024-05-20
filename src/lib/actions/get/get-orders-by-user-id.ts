import prisma from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

export const getOrdersByUserId = async (
  userId: number | string | undefined,
) => {
  if (!userId) {
    return null;
  }
  try {
    const orders = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        orders: true,
      },
    });
    return orders?.orders ? JSON.parse(orders.orders) : null;
  } catch (error) {
    console.error("Failed to get orders:", getErrorMessage(error));
    return null;
  }
};
