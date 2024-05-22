export type GoodCoookieType = {
  id: string;
  quantity: number;
};

// export type OrderItemType = {
//   id: string;
//   quantity: number;
// }

export type OrderType = {
  date: string;
  items: GoodCoookieType[];
};