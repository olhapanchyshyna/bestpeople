import prisma from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { OrderType } from "@/types/types"; // Предположим, что у вас есть тип OrderType

export const getLatestOrderByUserId = async (
  userId: number | string | undefined,
) => {
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        orders: true,
      },
    });

    if (!user || !user.orders) {
      return null;
    }

    const orders: OrderType[] = JSON.parse(user.orders);

    const latestOrder = orders.reduce(
      (prevOrder: OrderType, currentOrder: OrderType) =>
        prevOrder.date > currentOrder.date ? prevOrder : currentOrder
    );

    return latestOrder;
  } catch (error) {
    console.error("Failed to get latest order:", getErrorMessage(error));
    return null;
  }
};