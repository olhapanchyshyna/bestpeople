import Advantages from "@/components/advantages";
import Benefits from "@/components/benefits";
import CategorySlider from "@/components/category-slider";
import PopularGoods from "@/components/popular-goods";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getGoods } from '@/lib/actions/get/get-goods'
import Image from "next/image";

export default async function Page() {

  const initialPopularGoods = await getGoods({category: "popular"})

  if(!initialPopularGoods){
    throw new Error('initial goods not found in data base')
  }
  return (
    <main>
      <section className="!h-[calc(100vh-75px)]">
        <AspectRatio ratio={16 / 8}>
          <Image
            fill={true}
            src="/bg-with-arms.png"
            objectFit="cover"
            objectPosition="center"
            alt="bg-with-arms"
            className="!relative m-auto !h-[calc(100vh-75px)] bg-no-repeat xl:w-[100vw]"
          />
        </AspectRatio>
      </section>
      <CategorySlider />
      <PopularGoods initialPopularGoods={initialPopularGoods.goods}/>
      <Advantages />
      <Benefits />
    </main>
  );
}
