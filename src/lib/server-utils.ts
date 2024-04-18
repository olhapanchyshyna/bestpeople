import prisma from "./db";

export async function getGoods(category: string) {
  const goods = await prisma.goods.findMany({
    where: {
      category: category === "all" ? undefined : category,
    },
  });
  return { goods };
}
