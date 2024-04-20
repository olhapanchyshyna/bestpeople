import Aside from "@/components/aside";
import GoodsList from "@/components/goods-list";
import H2 from "@/components/h1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGoods } from "@/lib/server-utils";

export default async function Page() {
  const { totalCount } = await getGoods("all");
  return (
    <div className="container">
      <H2 text="Catalog" className="mb-[30px] mt-[20px] md:mt-[50px]" />
      <div className="mr-[20px] hidden items-end justify-end md:flex">
        <span className="mr-[5px] font-bold">{totalCount}</span> goods
      </div>
      <Accordion
        type="multiple"
        className="mr-[20px]  block w-[100%] items-center md:hidden"
      >
        <AccordionItem value="item-2 " className="!border-b-[0px]">
          <AccordionTrigger className="pt-0 no-underline [&>svg]:hidden  ">
            <div className="green-bg rounded-[43px] px-[35px] py-[16px] text-[16px] text-white">
              Filters
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Aside />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
        <div className="mr-[20px]  hidden w-[240px] md:block">
          <Aside />
        </div>

        <div className="mb-[60px] md:w-[800px]">
          <GoodsList category="all" />
        </div>
      </div>
    </div>
  );
}
