import { OrderType } from "@/types/types";

export const getItemsFromOrders = (orders: OrderType | null) => {
  if (!orders || !orders.items) {
    return null;
  }

  return orders.items;
};
