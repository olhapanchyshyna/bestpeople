"use client";
import { rPath } from "@/lib/actions/revalidate-path";
import { setGoodsBasketByUserId } from "@/lib/actions/set/set-goods-basket-by-user-id";
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import { useBasketStore } from "@/lib/store/useBasketStore";
import { GoodCoookieType } from "@/types/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type CountProps = {
  cookieGoodsArrays?: GoodCoookieType[] | null | undefined;
  currentGood: GoodCoookieType | undefined;
  typeAction: "inBasket" | "inGoodPage";
  setCountInPage?: (count: number) => void;
  countInPage?: number;
};

export default function Count({
  cookieGoodsArrays,
  currentGood,
  typeAction,
  setCountInPage,
  countInPage,
}: CountProps) {
  const { data } = useSession();
  const user = data?.user;
  const { setGoodsBasket, setTotalQuantity, goodsBasket } = useBasketStore();

  const [count, setCount] = useState(currentGood?.quantity || 1);

  useEffect(() => {
    if (currentGood) {
      setCount(currentGood.quantity);
    }
  }, [currentGood]);

  const setQuantityAndRedirect = (newCount: number) => {
    const currentCookie = user
      ? cookieGoodsArrays
      : getClientSideArrayCookie("basket");

    const updatedCookie = currentCookie
      ? currentCookie.map((item: GoodCoookieType) => {
          if (item.id === currentGood?.id.toString()) {
            item.quantity = newCount;
          }
          return item;
        })
      : [];

    setGoodsBasket(updatedCookie);

    const total = updatedCookie?.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0,
    );

    setTotalQuantity(total);

    user
      ? setGoodsBasketByUserId(user?.id, updatedCookie)
      : setClientSideArrayCookie("basket", [...updatedCookie], 30);

    rPath("/basket");
  };

  const handleDecrease = () => {
    if (count <= 1) {
      return;
    }

    const newCount = count - 1;
    setCount(newCount);

    if (typeAction === "inGoodPage") {
      setCountInPage && setCountInPage(newCount);
    }

    if (typeAction === "inBasket") {
      setQuantityAndRedirect(newCount);
    }
  };

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (typeAction === "inGoodPage") {
      setCountInPage && setCountInPage(newCount);
    }

    if (typeAction === "inBasket") {
      setQuantityAndRedirect(newCount);
    }
  };

  return (
    <div className="flex w-[130px] items-center justify-between rounded-[43px] border-2 border-[#E6E6E6] p-[8px]">
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={handleDecrease}
      >
        <MinusIcon />
      </button>
      <div>{typeAction === "inBasket" ? count : countInPage}</div>
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={handleIncrease}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
