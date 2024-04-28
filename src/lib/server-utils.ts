"use server";

import prisma from "./db";

type GoodsWhere = {
  category?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
};

export const getGoods = async (
  category: string,
  page = 1,
  minPrice = "",
  maxPrice = "",
  sort = "cheap"
) => {
  // Преобразуем минимальную и максимальную цену в числа
  const minPriceNumber = minPrice ? parseFloat(minPrice) : undefined;
  const maxPriceNumber = maxPrice ? parseFloat(maxPrice) : undefined;

  // Создаем объект where для запроса
  const where: GoodsWhere = {
    category: category === "all" ? undefined : category,
    price: {
      ...(minPriceNumber !== undefined ? { gte: minPriceNumber } : {}),
      ...(maxPriceNumber !== undefined ? { lte: maxPriceNumber } : {}),
    },
  };

  // Если нет ограничений по цене, удаляем условие по цене
  if (Object.keys(where.price ?? {}).length === 0) {
    delete where.price;
  }

  // Выполняем запрос с сортировкой по цене
  const goods = await prisma.goods.findMany({
    where,
    orderBy: {
      price: sort === "expensive" ? "desc" : "asc"
    
    },
    take: 3,
    skip: (page - 1) * 3,
  });

  // Подсчитываем общее количество товаров, удовлетворяющих условиям
  const totalCount = await prisma.goods.count({ where });

  return { goods, totalCount };
};

export const getGood = async (slug: string) => {
  const good = await prisma.goods.findUnique({
    where: {
      slug,
    },
  });

  return good;
};
