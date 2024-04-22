import notFound from "@/app/not-found";
import ButtonWithIcon from "@/components/button-with-icon";
import Count from "@/components/count";
import H2 from "@/components/h1";
import { PreviewSliderProduct } from '@/components/preview-slider-product'

import Services from "@/components/services";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGood } from "@/lib/server-utils";


type GoodPageProps = {
  params: {
    slug: string;
  };
};

function renderDescription(foolDescrObject: Record<string, unknown>) {
  // Убедитесь, что foolDescrObject не равен null или undefined
  if (!foolDescrObject) {
    return null; // Возвращаем null, если нет данных для обработки
  }

  // Продолжаем обработку, если все в порядке
  return Object.entries(foolDescrObject).map(([key, value]) => {
    // Приведение типа value к string, если вы уверены, что это строка
    const text = value as string;

    // Проверка типа
    if (typeof text === "string") {
      return (
        <p key={key} className="mb-[20px] flex flex-col">
          {text}
        </p>
      );
    }

    // Возвращаем null, если value не является строкой (это предохранитель)
    return null;
  });
}

export default async function GoodPage({ params }: GoodPageProps) {
  const slug = params.slug;
  const good = await getGood(slug);

  if (!good) return notFound();
  let foolDescrObject = null;

  if (good.foolDescr) {
    try {
      foolDescrObject = JSON.parse(good.foolDescr);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      // Обработка ошибки (например, установка foolDescrObject в значение по умолчанию)
      foolDescrObject = {};
    }
  }

  return (
    <section className="container my-[50px] flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className='flex justify-between min-w-[400px] items-center'>
					<PreviewSliderProduct/>
        </div>
        <div className="max-w-[500px]">
          <H2 text={good.title} className="leading-[45px]" />
          <div className="mt-[15px] text-[14px] font-bold text-[#666666]">
            <span className="text-[16px] text-[#333333] ">SKU:</span>{" "}
            {good.vendorCode}
          </div>
          <div className="dark-green mt-[15px] text-[32px]">{good.price}</div>
          <Separator className="my-[20px] bg-[#d1d4d6]" />

          <div className="text-[14px] ">
            <span className="text-[16px] font-bold">Brend: </span> {good.brend}
          </div>
          <div className="mt-[20px] text-[16px] text-[#808080]">
            {good.descr}
          </div>
          <Separator className="my-[20px] bg-[#d1d4d6]" />
          <div className="flex">
            <Count />
            <ButtonWithIcon
              text="Add to Basket"
              icon="/white-bag.svg"
              href=""
              className="ml-[20px] px-[75px]"
            />
          </div>
          <Separator className="my-[20px] bg-[#d1d4d6]" />
          <div>
            <span className="text-[16px] font-bold">Category: </span>{" "}
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
            {renderDescription(foolDescrObject)}
          </TabsContent>
          <TabsContent value="application">{good.application}</TabsContent>
          <TabsContent value="howWorks">{good.howWork}</TabsContent>
        </Tabs>
      </div>
      <Services />
    </section>
  );
}
