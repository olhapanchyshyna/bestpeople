"use server";

import prisma from "./db";

export const getGoods = async (
  category: string,
  page = 1,
  minPrice = "",
  maxPrice = "",
) => {
  function isNumberInRange(number: number, min: number, max: number) {
    return number >= min && number <= max;
  }

  const categoryGoods = await prisma.goods.findMany({
    where: {
      category: category === "all" ? undefined : category,
    },
  });

  const numericIds: number[] = [];
  for (const item of categoryGoods) {
    const price = parseFloat(item.price.replace("$", ""));
    const result = isNumberInRange(
      price,
      parseFloat(minPrice),
      parseFloat(maxPrice),
    );
    result && numericIds.push(item.id);
  }

  let goods;

  if (minPrice === "" && maxPrice === "") {
    goods = await prisma.goods.findMany({
      where: {
        category: category === "all" ? undefined : category,
      },
      take: 3,
      skip: (page - 1) * 3,
    });
  } else {
    goods = await prisma.goods.findMany({
      where: {
        id: {
          in: numericIds,
        },
      },
      take: 3,
      skip: (page - 1) * 3,
    });
  }

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

  console.log("Returned goods:", goods);
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
