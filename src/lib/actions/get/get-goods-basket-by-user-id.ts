import prisma from '@/lib/db'
import { getErrorMessage } from '@/lib/utils'
import { GoodCoookieType } from '@/types/types'

export const getGoodsBasketByUserId = async (userId: number | string | undefined): Promise<GoodCoookieType[] | null>  => {
	if (!userId) {
		return null;
	}
	try {
		const goodsBasket = await prisma.user.findUnique({
			where: {
				id: +userId,
			},
			select: {
				goodsBasket: true,
			},
		});
		return goodsBasket?.goodsBasket ? JSON.parse(goodsBasket.goodsBasket) : null;
	} catch (error) {
		console.error("Failed to get goods basket:", getErrorMessage(error));
		return null;
	}
}