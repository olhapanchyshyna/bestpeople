import { Goods } from "@prisma/client";
import { create } from "zustand";

type GoodsStoreType = {
  goods: Goods[] | undefined;
	filteredGoods: Goods[] | undefined;
	category: string;
	setGoods: (goods:  Goods[] | undefined) => void;
	setFilteredGoods: (filteredGoods:  Goods[] | undefined) => void;
	setCategory: (category:  string) => void;

};

export const useGoodsStore = create<GoodsStoreType>((set) => ({
  goods: undefined,
  filteredGoods: undefined,
	category: 'all',
	setGoods: (goods) => set({ goods }),
	setFilteredGoods: (filteredGoods) => set({ filteredGoods }),
	setCategory: (category) => set({ category }),
}));
