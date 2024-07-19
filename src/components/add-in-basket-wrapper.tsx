"use client";
import { GoodCoookieType } from "@/types/types";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import BasketButton from "./basket-button";
import Count from "./count";

type AddInBasketWrapperProps = {
  currentGood: GoodCoookieType | undefined;
  id: string;
  cookieGoodsArrays: GoodCoookieType[] | null | undefined;
};

export default function AddInBasketWrapper({
  currentGood,
  id,
  cookieGoodsArrays,
}: AddInBasketWrapperProps) {
  const [countInPage, setCountInPage] = useState(1);

  return (
    <div className="order-1 flex items-center md:order-none ">
      {/* <SessionProvider> */}
        <Count
          cookieGoodsArrays={cookieGoodsArrays}
          currentGood={currentGood}
          typeAction="inGoodPage"
          setCountInPage={setCountInPage}
          countInPage={countInPage}
        />
        <BasketButton
          id={id}
          countInPage={countInPage}
          cookieGoodsArrays={cookieGoodsArrays}
        />
      {/* </SessionProvider> */}
    </div>
  );
}
