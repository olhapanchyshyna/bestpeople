"use client";

import { useBasketStore } from "@/lib/store/useBasketStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Phone from "./phone";

export default function PageIcons() {
  const { data: session, update } = useSession();
  const [isLoadedDb, setIsLoadedDb] = useState(false);

  const { totalQuantity, fetchBasketData } = useBasketStore();


  if (!isLoadedDb && session) {
    console.log(session)
    fetchBasketData(session);
    setIsLoadedDb(true);
  }

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
