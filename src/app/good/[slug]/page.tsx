import notFound from "@/app/not-found";
import ButtonWithIcon from "@/components/button-with-icon";
import Count from "@/components/count";
import H2 from "@/components/h1";
import { PreviewSliderProduct } from "@/components/preview-slider-product";

import Services from "@/components/services";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGood } from "@/lib/server-utils";

type GoodPageProps = {
  params: {
    slug: string;
  };
};

function renderDescription(foolDescrArray: string[]) {
  // Убедитесь, что foolDescrObject не равен null или undefined
  if (!Array.isArray(foolDescrArray)) {
    console.error("foolDescrArray не является массивом");
    return null;
  }
  // Продолжаем обработку, если все в порядке
  return foolDescrArray.map((text, index) => (
    <p key={index} className="mb-[20px] flex flex-col">
      {text}
    </p>
  ));
}

export default async function GoodPage({ params }: GoodPageProps) {
  const slug = params.slug;
  const good = await getGood(slug);

  if (!good) return notFound();

  let foolDescrArray;

  try {
    foolDescrArray = JSON.parse(good.foolDescr);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    // Обработка ошибки (например, установка foolDescrObject в значение по умолчанию)
    foolDescrArray = [];
  }

  return (
    <section className="container my-[30px] md:my-[50px] flex flex-col">
      <div className="flex flex-col md:items-center justify-between md:flex-row">
        <H2 text={good.title} className="leading-[35px] md:hidden mb-[10px]" />
        <div className="mb-[15px] md:hidden items-center text-[14px] font-bold text-[#666666] flex">
          <span className="mr-[5px] text-[16px] text-[#333333]">SKU:</span>{" "}
          {good.vendorCode}
        </div>
        <div className="md:mr-[30px] flex min-w-[320px] flex-col items-center justify-between md:flex-row lg:mr-0 lg:min-w-[400px]">
          <PreviewSliderProduct />
        </div>
        <div className="mr-[30px] flex md:max-w-[500px] flex-col lg:mr-0">
          <H2 text={good.title} className="hidden leading-[35px] lg:leading-[45px] md:flex" />
          <div className="mt-[15px] hidden items-center text-[14px] font-bold text-[#666666] md:flex">
            <span className="mr-[5px] text-[16px] text-[#333333]">SKU:</span>{" "}
            {good.vendorCode}
          </div>
          <div className="dark-green mt-[15px] text-[32px]">{good.price}</div>
          <Separator className="my-[20px] bg-[#d1d4d6]" />

          <div className="hidden items-center text-[14px] md:flex">
            <span className="mr-[5px] text-[16px] font-bold">Brend: </span>{" "}
            {good.brend}
          </div>
          <div className="order-3 mt-[20px] text-[16px] text-[#808080] md:order-none ">
            {good.descr}
          </div>
          <Separator className="order-2 my-[20px] bg-[#d1d4d6] md:order-none" />
          <div className="order-1 flex md:order-none ">
            <Count />
            <ButtonWithIcon
              text="Add to Basket"
              icon="/white-bag.svg"
              href=""
              className="ml-[12px] md:ml-[5px] px-[25px] lg:ml-[20px] lg:px-[75px]"
            />
          </div>
          <Separator className="my-[20px] hidden bg-[#d1d4d6] md:flex" />
          <div className="hidden items-center md:flex">
            <span className="mr-[5px] text-[16px] font-bold">Category: </span>{" "}
            {good.category}
          </div>
        </div>
      </div>

      <div className="mt-[50px]">
        <Tabs defaultValue="description" className="">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="description"
              className="mr-[40px] px-0 text-[16px]"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="application"
              className="mr-[40px] px-0 text-[16px]"
            >
              Application
            </TabsTrigger>
            <TabsTrigger value="howWorks" className="px-0 text-[16px]">
              How does it work
            </TabsTrigger>
          </TabsList>
          <Separator className="my-[20px] bg-[#d1d4d6]" />

          <TabsContent value="description">
            {renderDescription(foolDescrArray)}
          </TabsContent>
          <TabsContent value="application">{good.application}</TabsContent>
          <TabsContent value="howWorks">{good.howWork}</TabsContent>
        </Tabs>
      </div>
      <Services />
    </section>
  );
}
