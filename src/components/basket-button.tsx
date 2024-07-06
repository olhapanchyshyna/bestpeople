"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { rPath } from "@/lib/actions/revalidate-path";
import { setGoodsBasketByUserId } from "@/lib/actions/set/set-goods-basket-by-user-id";
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import { GoodCoookieType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import { Button } from "./ui/button";
import { redirect } from 'next/navigation'

type BasketButtonProps = {
  id: number;
  countInPage: number;
  cookieGoodsArrays: GoodCoookieType[] | null | undefined;
};

export default function BasketButton({
  id,
  countInPage,
  cookieGoodsArrays,
}: BasketButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSession();
  const user = data?.user;

  const setGoodInBasket = (id: number) => {
    const currentCookie = user
      ? cookieGoodsArrays
      : getClientSideArrayCookie("basket");


    if (currentCookie?.length === 0 || !currentCookie) {
      user
        ? setGoodsBasketByUserId(user?.id, [
            { id: id.toString(), quantity: countInPage },
          ])
        : setClientSideArrayCookie(
            "basket",
            [{ id: id.toString(), quantity: countInPage }],
            30,
          );
      setIsLoading(false);
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

    user
      ? setGoodsBasketByUserId(user?.id, updatedCookie)
      : setClientSideArrayCookie("basket", [...updatedCookie], 30);
    setIsLoading(false);

    rPath("/basket");
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={isLoading}
        className="green-bg ml-[12px] flex w-[180px] justify-between rounded-[43px] px-[25px] py-[16px] text-white md:ml-[5px] lg:ml-[20px] lg:w-[290px] lg:px-[75px]"
        onClick={() => {
          startTransition(() => {
            setIsLoading(true);
            setGoodInBasket(id);
          });
        }}
      >
        {isLoading ? "Adding..." : "Add to basket"}

        <Image
          src="/white-bag.svg"
          alt="basket"
          width={20}
          height={20}
          className="ml-[10px] lg:ml-[20px]"
        />
      </DialogTrigger>
      {!isLoading && (
        <DialogContent className="w-[300px] md:w-[500px] ">
          <DialogHeader className="w-[250px] md:w-[450px]">
            <DialogTitle className="text-center text-[16px] md:text-[18px]">
              Your item has been successfully added to cart
            </DialogTitle>
            <DialogDescription className="!my-[10px] text-center text-[12px] md:text-[14px]">
              View product?
            </DialogDescription>
            <div className="flex items-center justify-between  md:!mt-[40px] ">
              <DialogClose
                asChild
                className="hover:dark-green-bg dark-green-bg w-[200px] text-white"
              >
                <Button
                  type="button"
                  className="w-[100px] md:w-[200px] !hover:dark-green-bg"
                  onClick={() => {
                    console.log(1)
                    rPath("/basket");
                  }}
                >
                  Close
                </Button>
              </DialogClose>

              <Link
                href="/basket"
                className="w-[100px] rounded-[43px] text-white md:w-[200px] md:text-[16px]"
              >
                <Button
                  className="w-[100px] md:w-[200px]"
                  onClick={() => {
                    console.log(2)
                    rPath("/basket");
                  }}
                >
                  Go to cart
                </Button>
              </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
