import Advantages from "@/components/advantages";
import Benefits from "@/components/benefits";
import CategorySlider from "@/components/category-slider";
import PopularGoods from "@/components/popular-goods";
import Image from "next/image";

export default function page() {
  return (
    <main>
      <section>
        <picture>
          <source
            media="(max-width: 550px)"
            srcSet="/bg-with-arms-mobile.png"
            className=""
          />
          <Image
            src="/bg-with-arms.png"
            alt="bg-with-arms"
            width={1880}
            height={750}
            className="m-auto bg-no-repeat max-[550px]:h-[500px] max-[450px]:h-[430px]  xl:h-[80vh] xl:w-[100vw]"
          />
        </picture>
      </section>
      <CategorySlider />
      <PopularGoods />
      <Advantages />
      <Benefits />
    </main>
  );
}
