import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { auth } from "@/lib/auth";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";
import Image from "next/image";
import Link from "next/link";
import Phone from "./phone";

export default async function PageIcons() {

  const session = await auth();
  const cookieGoodsArrays = session
    ? await getGoodsBasketByUserId(session?.user?.id)
    : await getServerSideArrayCookie("basket");

    
  const totalQuantity = cookieGoodsArrays?.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);

  return (
    <div className="order-3 flex justify-between md:order-none md:w-64">
      <Phone type="header" width={28} height={28} className="hidden md:flex" />
      <div className="flex w-16 items-center justify-between">
        <Link href="/login">
          <Image src="/profile.svg" alt="profile" width={30} height={30} />
        </Link>
        <Link href="/basket" className="relative">
          <Image src="/basket.svg" alt="basket" width={17} height={30} />
          <div className="absolute justify-center right-[-8px] top-[-8px] flex h-[15px] items-center rounded-full bg-[#fca600] w-[15px] py-[1px] text-[8px] leading-[3px] text-white">
            {totalQuantity}
          </div>
        </Link>
      </div>
    </div>
  );
}
