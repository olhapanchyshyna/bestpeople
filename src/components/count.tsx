"use client";
import { rPath } from "@/lib/actions/revalidate-path";
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import { GoodCoookieType } from "@/types/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type CountProps = {
  currentGood: GoodCoookieType | undefined;
  typeAction: "inBasket" | "inGoodPage";
  setCountInPage?: (count: number) => void;
  countInPage?: number;
};

export default function Count({ currentGood, typeAction, setCountInPage, countInPage }: CountProps) {

  const [count, setCount] = useState(typeAction === 'inBasket' ? currentGood?.quantity || 1 : 1);

  const setQuentity = (count: number) => {
    const currentCookie = getClientSideArrayCookie("basket");
    const updatedCookie = currentCookie
      ? currentCookie.map((item: GoodCoookieType) => {
          if (item.id === currentGood?.id.toString()) {
            item.quantity = count;
          }
          return item;
        })
      : [];

    setClientSideArrayCookie("basket", [...updatedCookie], 30);
    rPath("/basket");
  };

  return (
    <div className="flex w-[130px] items-center justify-between rounded-[43px] border-2 border-[#E6E6E6] p-[8px]">
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={() => {
          if (count <= 1) {
            return;
          } else if (count >= 2) {
            if(typeAction === "inGoodPage") {
              setCountInPage && setCountInPage(count - 1);
            }
            if (typeAction === "inBasket") {
              setCount(count - 1);
              setQuentity(count - 1);
              
            }
          }
        }}
      >
        <MinusIcon />
      </button>
      <div>{ typeAction === "inBasket" ? count : countInPage}</div>
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={() => {
          setCount(count + 1);
          if(typeAction === "inGoodPage") {
            setCountInPage && setCountInPage(count + 1)
          }
          if (typeAction === "inBasket") {
            setQuentity(count + 1);
          }
        }}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
