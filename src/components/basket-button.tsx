"use client";

import { rPath } from '@/lib/actions/revalidate-path'
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie"
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie"
import Image from "next/image"
import { Button } from "./ui/button"

type BasketButtonProps = {
  id: number;
  countInPage: number;
};

export default function BasketButton({ id, countInPage}: BasketButtonProps) {

console.log('countInPage', countInPage);

  const setGoodInBasket = (id: number) => {
    const currentCookie = getClientSideArrayCookie("basket");

    if (currentCookie?.length === 0) {
      setClientSideArrayCookie(
        "basket",
        [{ id: id.toString(), quantity: countInPage }],
        30,
      );
      return;
    }

    const isGoodInBasket = currentCookie?.find(
      (item) => item.id === id.toString(),
    );

    const updatedCookie = !!isGoodInBasket
      ? currentCookie
        ? currentCookie.map((item) => {
            if (item.id === id.toString()) {
              item.quantity += countInPage;
            }
            return item;
          })
        : []
      : (currentCookie && [
          ...currentCookie,
          { id: id.toString(), quantity: countInPage },
        ]) ||
        [];

    setClientSideArrayCookie("basket", [...updatedCookie], 30);

   
    rPath("/basket");
  };

  return (
    <Button
      onClick={() => {
        setGoodInBasket(id)
      }}
      className="green-bg ml-[12px] flex justify-between rounded-[43px] px-[25px] py-[16px] text-white md:ml-[5px] lg:ml-[20px] lg:px-[75px]"
    >
      Add to Basket
      <Image
        src="/white-bag.svg"
        alt="basket"
        width={20}
        height={20}
        className="ml-[10px] lg:ml-[20px]"
      />
    </Button>
  );
}
