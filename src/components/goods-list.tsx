import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getGoods } from "@/lib/server-utils";
import Image from "next/image";

type GoodsListProps = {
	category: string;
};

export default async function GoodsList({category}:GoodsListProps) {
  const { goods } = await getGoods(category);

  return (
    <section className="container flex p-0 flex-wrap justify-center sm:justify-between">
      {goods.map((good) => (
        <Card
          className="m-[5px] flex h-[220px] w-[320px] sm:h-[350px] sm:w-[240px] flex-col items-center justify-between rounded-[8px] pb-[20px] sm:pb-[30px] px-[10px] sm:px-[21px] pt-[20px] sm:pt-[60px] hover:border-[#6e860b]"
          key={good.id}
          style={{ boxShadow: "-1px 4px 40px -8px rgba(0 0 0 / 21%)" }}
        >
          <Image src={good.img} alt="" width={135} height={130} className='w-[110px] sm:w-[125px] max-h-[170px] mb-[10px] sm:mb-0' />
          <CardFooter className='items-end p-0'>
            <div>
              <CardTitle className="text-[14px] font-normal mb-[10px] text-gray-700">
                {good.title}
              </CardTitle>
              <CardDescription className="dark-green text-[16px] font-bold">
                {good.price}
              </CardDescription>
            </div>
						<button className="btn btn-green">
							<Image src='/basket-green.svg' alt='basket-green' width={17} height={22} className='w-[17px] max-w-[17px]'/>
						</button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
