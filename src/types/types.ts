export type GoodCoookieType = {
  id: string;
  quantity: number;
};

export type OrderType = {
  date: string;
  items: GoodCoookieType[];
  isNotified: boolean;
  orderDetails: OrderDetails;
};

export type CityAndWarehouseType = {
  Ref: string;
  Description: string;
}

export type OrderDetails = {
  city: string;
  department: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  message?: string;
}


