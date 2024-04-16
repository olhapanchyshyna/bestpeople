import prisma from './db'

export async function getGoods(categoryName:  string){
	const goods = await prisma.goods.findMany({
		where: {
			category: categoryName
		}
	})
	return {goods}
}