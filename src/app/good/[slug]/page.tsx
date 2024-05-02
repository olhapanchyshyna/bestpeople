import notFound from "@/app/not-found";
import ButtonWithIcon from "@/components/button-with-icon";
import Count from "@/components/count";
import H2 from "@/components/h2";
import { PreviewSliderProduct } from "@/components/preview-slider-product";

import Services from "@/components/services";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGood } from "@/lib/server-utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  let imgArray;

  try {
    foolDescrArray = JSON.parse(good.foolDescr);
    imgArray = JSON.parse(good.img);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    // Обработка ошибки (например, установка foolDescrObject в значение по умолчанию)
    foolDescrArray = [];
    imgArray = [];
  }

  return (
    <section className="container my-[30px] flex flex-col px-[15px] md:my-[50px] md:px-[25px]">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <H2 text={good.title} className="mb-[10px] leading-[35px] md:hidden" />
        <div className="mb-[15px] flex items-center text-[14px] font-bold text-[#666666] md:hidden">
          <span className="mr-[5px] text-[16px] text-[#333333]">SKU:</span>{" "}
          {good.vendorCode}
        </div>
        <div className="flex min-w-[320px] flex-col items-center justify-between md:mr-[30px] md:flex-row lg:mr-0 lg:min-w-[400px]">
          <PreviewSliderProduct imgArray={imgArray} />
        </div>
        <div className="flex flex-col md:mr-[30px] md:max-w-[500px] lg:mr-0">
          <H2
            text={good.title}
            className="hidden leading-[35px] md:flex lg:leading-[45px]"
          />
          <div className="mt-[15px] hidden items-center text-[14px] font-bold text-[#666666] md:flex">
            <span className="mr-[5px] text-[16px] text-[#333333]">SKU:</span>{" "}
            {good.vendorCode}
          </div>
          <div className="dark-green mt-[15px] text-[32px]">{good.price}$</div>
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
              id={good.id || 0}
              text="Add to Basket"
              icon="/white-bag.svg"
              href=""
              className="ml-[12px] px-[25px] md:ml-[5px] lg:ml-[20px] lg:px-[75px]"
            />
          </div>
          <Separator className="my-[20px] hidden bg-[#d1d4d6] md:flex" />
          <div className="hidden items-center md:flex">
            <span className="mr-[5px] text-[16px] font-bold">Category: </span>{" "}
            {good.category}
          </div>
        </div>
      </div>

      <div className="mt-[30px] md:mt-[50px]">
        <Tabs defaultValue="description" className="hidden md:block">
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

          <TabsContent value="description" className="text-gray-700">
            {renderDescription(foolDescrArray)}
          </TabsContent>
          <TabsContent value="application" className="text-gray-700">
            {good.application}
          </TabsContent>
          <TabsContent value="howWorks" className="text-gray-700">
            {good.howWork}
          </TabsContent>
        </Tabs>

        <Accordion type="single" collapsible className="md:hidden">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className=" mb-[15px] border-2 border-[#B3DB11] px-[16px] ">
              Description
            </AccordionTrigger>
            <AccordionContent className="text-gray-500">
              {renderDescription(foolDescrArray)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className=" mb-[15px] border-2 border-[#B3DB11] px-[16px] ">
              Application
            </AccordionTrigger>
            <AccordionContent className="text-gray-500">
              {good.application}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className=" mb-[15px] border-2 border-[#B3DB11] px-[16px] ">
              How does it work
            </AccordionTrigger>
            <AccordionContent className="text-gray-500">
              {good.howWork}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Services className="my-[10px]" />
    </section>
  );
}
