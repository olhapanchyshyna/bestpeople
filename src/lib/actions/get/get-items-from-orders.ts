import { GoodCoookieType, OrderItemType } from "@/types/types";

type OrderType = {
  date: string;
  items: GoodCoookieType[];
};

export const getItemsFromOrders = (
  orders: OrderType[] | null,
): GoodCoookieType[] | null => {
  let items: GoodCoookieType[] = [];

  if (!orders) {
    return null;
  }

  orders.forEach((order) => {
    items = [...items, ...order.items];
  });
  return items;
};
