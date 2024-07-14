import { Goods } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import GoodsList from "./goods-list";
import H2 from "./h2";

type PopularGoodsProps = {
  initialPopularGoods: Goods[];
};

export default function PopularGoods({
  initialPopularGoods,
}: PopularGoodsProps) {
  return (
    <section className="container pb-[70px] pt-[100px]">
      <div className="flex justify-between ">
        <H2 text="Popular goods" className="mb-[50px] w-[140px] sm:w-auto" />
        <Link
          href="/catalog?category=all"
          className="ml-[10px] flex h-[50px] items-center"
        >
          <div className="dark-green mr-2 leading-[20px] sm:mr-4">
            All goods
          </div>
          <Image
            src="/arrow-right-green.svg"
            alt="arrow-right-green"
            width={17}
            height={22}
            className="m w-[17px] max-w-[17px]"
          />
        </Link>
      </div>
      <GoodsList initialGoods={initialPopularGoods} />
    </section>
  );
}
