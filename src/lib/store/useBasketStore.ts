import { Session } from "next-auth";
import { create } from "zustand";
import { getGoodsBasketByUserId } from "../actions/get/get-goods-basket-by-user-id";
import { getServerSideArrayCookie } from "../cookies/server/get-server-side-array-cookie";
import { GoodCoookieType } from '@/types/types'
import { useOptimistic } from 'react'
import { Goods } from '@prisma/client'

type goodsBasketType = {
  id: string;
  quantity: number;
};

type BasketStoreType = {
  goodsBasket: GoodCoookieType[] | undefined;
  totalQuantity: number;
  isPending: boolean;
  setTotalQuantity: (newTotal: number | undefined) => void;
  setGoodsBasket: (newBasket: GoodCoookieType[] | undefined) => void;
  setIsPending: (isPending: boolean) => void
};



export const useBasketStore = create<BasketStoreType>((set) => ({
  goodsBasket: [],
  totalQuantity: 0,
  count: 1,
  isPending: true,
  setTotalQuantity: (newTotal) => set({ totalQuantity: newTotal }),
  setGoodsBasket: (newBasket) => set({ goodsBasket: newBasket }),
  setIsPending: (isPending) => set({ isPending: isPending }),
}));
