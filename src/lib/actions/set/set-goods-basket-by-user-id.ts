"use server"

import prisma from '@/lib/db'
import { getErrorMessage } from '@/lib/utils'
import { GoodCoookieType } from '@/types/types'

export const setGoodsBasketByUserId = async (
  userId: number | string | undefined,
  newBasket: GoodCoookieType[],
): Promise<boolean> => {
  if (!userId) {
    return false;
  }
  try {
    await prisma.userBest.update({
      where: {
        id: +userId,
      },
      data: {
        goodsBasket: JSON.stringify(newBasket),
      },
    });
    return true;
  } catch (error) {
    console.error('Failed to set goods basket:', getErrorMessage(error));
    return false;
  }
};
