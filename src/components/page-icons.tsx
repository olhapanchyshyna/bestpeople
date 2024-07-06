"use client";

import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";
import { GoodCoookieType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Phone from "./phone";

export default function PageIcons() {
  const { data: session } = useSession();
  const [cookieGoodsArrays, setCookieGoodsArrays] = useState<
    GoodCoookieType[] | undefined
  >(undefined);

  const [totalQuantity, setTotalQuantity] = useState<number | undefined>(0);

  useEffect(() => {
    const fetchData = async () => {
      let goods;
      if (session) {
        goods = await getGoodsBasketByUserId(session?.user?.id);
      } else {
        goods = await getServerSideArrayCookie("basket");
      }
      setCookieGoodsArrays(goods);

      const total = goods?.reduce((total, currentItem) => {
        return total + currentItem.quantity;
      }, 0);
      setTotalQuantity(total);
    };

    fetchData();
  }, [session]);

  return (
    <div className="order-3 flex justify-between md:order-none md:w-64">
      <Phone type="header" width={25} height={28} className="hidden md:flex cursor-pointer" />
      <div className="flex w-16 items-center justify-between">
        <Link href="/login" className='hover:bg-[#c9b64378] rounded-md p-[1px]'>
          <Image src="/profile.svg" alt="profile" width={28} height={30} />
        </Link>
        <Link href="/basket" className='relative hover:bg-[#c9b64378] rounded-md px-[5px] py-[4px]'>
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
