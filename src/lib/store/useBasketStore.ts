import create from 'zustand';
import { getGoodsBasketByUserId } from '@/lib/actions/get/get-goods-basket-by-user-id';
import { getServerSideArrayCookie } from '@/lib/cookies/server/get-server-side-array-cookie';

const useBasketStore = create((set) => ({
  cookieGoodsArrays: [],
  totalQuantity: 0,
  fetchBasketData: async (session: any) => {
    let goods;
    if (session) {
      goods = await getGoodsBasketByUserId(session.user.id);
    } else {
      goods = await getServerSideArrayCookie('basket');
    }

    const total = goods?.reduce((total, currentItem) => total + currentItem.quantity, 0);

    set({ cookieGoodsArrays: goods, totalQuantity: total });
  },
  updateTotalQuantity: (newTotal: any) => set({ totalQuantity: newTotal }),
}));

export default useBasketStore;
