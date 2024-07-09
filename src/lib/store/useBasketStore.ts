import { Session } from "next-auth";
import { create } from "zustand";
import { getGoodsBasketByUserId } from "../actions/get/get-goods-basket-by-user-id";
import { getServerSideArrayCookie } from "../cookies/server/get-server-side-array-cookie";

type goodsBasketType = {
  id: string;
  quantity: number;
};

type BasketStoreType = {
  goodsBasket: goodsBasketType[] | undefined;
  totalQuantity: number;
  setTotalQuantity: (newTotal: number | undefined) => void;
  fetchBasketData: (session: Session | null) => void;
  setGoodsBasket: (newBasket: goodsBasketType[]) => void;
};

export const useBasketStore = create<BasketStoreType>((set) => ({
  goodsBasket: [],
  totalQuantity: 0,
  count: 1,
  setTotalQuantity: (newTotal) => set({ totalQuantity: newTotal }),
  fetchBasketData: async (session) => {
    let goods;

    if (session && session.user) {
      goods = await getGoodsBasketByUserId(session.user.id);
    } else {
      goods = await getServerSideArrayCookie("basket");
    }

    const total = goods?.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0,
    );
    set({ goodsBasket: goods, totalQuantity: total });
  },
  setGoodsBasket: (newBasket) => set({goodsBasket: newBasket})

}));
