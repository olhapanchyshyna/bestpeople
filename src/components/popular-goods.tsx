import Image from "next/image";
import Link from "next/link";
import GoodsList from "./goods-list";
import H2 from "./h1";

export default function PopularGoods() {
  return (
    <section className="container pb-[70px] pt-[100px]">
      <div className="flex justify-between">
        <H2 text="Popular goods" className="mb-[50px]" />
        <Link href="/catalog" className="flex h-[50px] items-center">
          <div className='dark-green mr-4'>All goods</div>
          <Image
            src="/arrow-right-green.svg"
            alt="arrow-right-green"
            width={17}
            height={22}
            className="m w-[17px] max-w-[17px]"
          />
        </Link>
      </div>
      <GoodsList category='popular' />
    </section>
  );
}
