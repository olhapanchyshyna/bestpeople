import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getGoods = unstable_cache(async (category: string, page = 1) => {
  const goods = await prisma.goods.findMany({
    where: {
      category: category === "all" ? undefined : category,
    },
    take: 9,
    skip: (page - 1) * 9,
  });

  let totalCount;
  if (category === "all") {
    totalCount = await prisma.goods.count();
  } else {
    totalCount = await prisma.goods.count({
      where: {
        category: category,
      },
    });
  }

  return { goods, totalCount };
});

export const getGood = unstable_cache(async (slug: string) => {
  const good = await prisma.goods.findUnique({
    where: {
      slug: slug,
    },
  });

  return good;
});
