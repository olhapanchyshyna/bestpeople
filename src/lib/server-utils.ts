"use server"

import prisma from "./db"

export const getGoods = async (category: string, page = 1) => {
  const goods = await prisma.goods.findMany({
    where: {
      category: category === "all" ? undefined : category,
    },
    take: 3,
    skip: (page - 1) * 3,
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

  // if(goods.length === 0) {
  //   console.log("No goods found");
  // }
  
  return { goods, totalCount };
};

export const getGood = async (slug: string) => {
  const good = await prisma.goods.findUnique({
    where: {
      slug: slug,
    },
  });

  return good;
};
