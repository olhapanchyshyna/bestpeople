"use client";

import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";
import { useBasketStore } from "@/lib/store/useBasketStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useTransition } from "react";
import Phone from "./phone";

export default function PageIcons() {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  const { totalQuantity, setTotalQuantity, setGoodsBasket, setIsPending } =
    useBasketStore();

  useEffect(() => {
    startTransition(async () => {
      let goods;
      if (status !== "loading") {
        if (session && session.user) {
          goods = await getGoodsBasketByUserId(session.user.id);
        } else {
          goods = await getServerSideArrayCookie("basket");
        }
        const total = goods?.reduce(
          (total, currentItem) => total + currentItem.quantity,
          0,
        );

        setTotalQuantity(total);
        setGoodsBasket(goods);
        setIsPending(false);
      }
    });
  }, [status]);

  return (
    <div className="order-3 flex justify-between md:order-none md:w-64">
      <Phone
        type="header"
        width={25}
        height={28}
        className="hidden cursor-pointer md:flex"
      />
      <div className="flex w-16 items-center justify-between">
        <Link href="/login" className="rounded-md p-[1px] hover:bg-[#c9b64378]">
          <Image src="/profile.svg" alt="profile" width={28} height={30} />
        </Link>
        <Link
          href="/basket"
          className="relative rounded-md px-[5px] py-[4px] hover:bg-[#c9b64378]"
        >
          <Image src="/basket.svg" alt="basket" width={18} height={30} />
          {totalQuantity ? (
            <div className="absolute right-[-8px] top-[-8px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#fca600] py-[1px] text-[8px] leading-[3px] text-white">
              {totalQuantity}
            </div>
          ) : null}
        </Link>
      </div>
    </div>
  );
}
