import Aside from "@/components/aside";
import Breadcrumbs from "@/components/breadcrumbs";
import CatalogListWrapper from "@/components/catalog-list-wrapper";
import H2 from "@/components/h2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGoods } from '@/lib/actions/get/get-goods'

// type PageProps = {
//   searchParams: {
//     page: string;
//   };
// };

export default async function Page() {
  // const page = searchParams.page || "1";

  const { totalCount, goods } = await getGoods({category: "all"})

  if(!totalCount || !goods){
    throw new Error('initial goods not found in data base')
  }
  return (
    <>
      <Breadcrumbs />
      <div className="container">
        <H2 text="Catalog" className="mb-[30px] mt-[20px] md:mt-[50px]" />
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

          <CatalogListWrapper initialAllGoods={goods} totalCount={totalCount}/>
        </div>
      </div>
    </>
  );
}
