export type GoodCoookieType = {
  id: string;
  quantity: number;
};

export type OrderType = {
  date: string;
  items: GoodCoookieType[];
};

export type CityAndWarehouseType = {
  Ref: string;
  Description: string;
}