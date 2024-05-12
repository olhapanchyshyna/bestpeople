import prisma from "@/lib/db";

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
    console.error("Failed to get good:", error);
    return []; // Лучше вернуть пустой массив, чем null
  }
};
