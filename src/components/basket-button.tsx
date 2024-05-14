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
import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import { Button } from "./ui/button";

type BasketButtonProps = {
  id: number;
  countInPage: number;
};

export default function BasketButton({ id, countInPage }: BasketButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const setGoodInBasket = (id: number) => {
    const currentCookie = getClientSideArrayCookie("basket");

    if (currentCookie?.length === 0) {
      setClientSideArrayCookie(
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

    setClientSideArrayCookie("basket", [...updatedCookie], 30);
    setIsLoading(false);
    rPath("/basket");
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={isLoading}
        className="green-bg ml-[12px] w-[180px] lg:w-[290px] flex justify-between rounded-[43px] px-[25px] py-[16px] text-white md:ml-[5px] lg:ml-[20px] lg:px-[75px]"
        onClick={() => {
          startTransition(() => {
            setIsLoading(true);
            setTimeout(() => {
              setGoodInBasket(id);
            }, 1000);
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Your item has been successfully added to cart
            </DialogTitle>
            <DialogDescription className="!my-[10px]">
              View product?
            </DialogDescription>
            <div className="!mt-[40px] flex items-center  justify-between ">
              <DialogClose
                asChild
                className="dark-green-bg w-[200px] text-white"
              >
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="m-auto w-[200px] rounded-[43px]  text-white ">
                <Link href="/basket" className="w-[100%] text-[16px]">
                  Go to cart
                </Link>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
