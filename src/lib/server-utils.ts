import prisma from "./db";

export async function getGoods(category: string, page = 1) {
  const goods = await prisma.goods.findMany({
    where: {
      category: category === "all" ? undefined : category,
    },
    take: 9,
		skip: (page - 1) * 9,
  });

  let totalCount
	if (category === 'all') {
		totalCount = await prisma.goods.count()
	} else {
		totalCount = await prisma.goods.count({
			where: {
				category: category,
			},
		})
	}

  return { goods, totalCount };
}
