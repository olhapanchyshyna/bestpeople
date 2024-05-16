import prisma from "@/lib/db";
import { getErrorMessage } from '@/lib/utils'

export const getGoodsById = async (ids: number[] | undefined) => {
  if (ids === undefined) {
    return [];
  }

  try {
    const goods = await prisma.goods.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return goods;
  } catch (error) {
    console.error("Failed to get good:", getErrorMessage(error));
    return []; // Лучше вернуть пустой массив, чем null
  }
};
