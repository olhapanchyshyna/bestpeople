"use client";

import { rPath } from "@/lib/actions/revalidate-path";
import { setGoodsBasketByUserId } from "@/lib/actions/set/set-goods-basket-by-user-id";
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import { GoodCoookieType } from "@/types/types";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useBasketStore } from '@/lib/store/useBasketStore'

type DeleteGoodButtonProps = {
  id: number;
  cookieGoodsArrays: GoodCoookieType[] | null | undefined;
};

export default function DeleteGoodButton({
  id,
  cookieGoodsArrays,
}: DeleteGoodButtonProps) {
  const { data } = useSession();
  const user = data?.user;
  const { setGoodsBasket, setTotalQuantity } = useBasketStore();
  
  const deletwGoodFromBasket = (id: number) => {
    // Get current cookie
    const currentCookie = user
      ? cookieGoodsArrays
      : getClientSideArrayCookie("basket");

    // Filter out the good with the id that matches the id passed to the function
    const updatedCookie = currentCookie?.filter(
      (item) => item.id !== id.toString(),
    );
    // Set the new cookie


    updatedCookie && setGoodsBasket(updatedCookie);

    const total = updatedCookie?.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0,
    );

    setTotalQuantity(total);

    user
      ? setGoodsBasketByUserId(user?.id, updatedCookie || [])
      : setClientSideArrayCookie("basket", [...(updatedCookie || [])], 30);

    rPath("/basket");
  };

  return (
    <Button variant="link" onClick={() => deletwGoodFromBasket(id)}>
      <CrossCircledIcon
        className="h-[20px] w-[20px] cursor-pointer hover:stroke-red-400"
        style={{ color: "#374151" }}
      />
    </Button>
  );
}