import Breadcrumbs from "@/components/breadcrumbs";
import ButtonCustom from "@/components/button";
import Count from "@/components/count";
import H2 from "@/components/h2";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const invoices = [
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
    src: "/coktail-banana.png",
  },
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
    src: "/coktail-banana.png",
  },
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
    src: "/coktail-banana.png",
  },
];

export default function page() {
  return (
    <>
      <Breadcrumbs />
      <section className="container mb-[35px] mt-[44px] md:mb-[85px]">
        <H2 text="Basket" className="mb-[40px]" />
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-[30px] md:rounded-[8px] md:border-2 md:border-[#E6E6E6] lg:mb-0">
            <Table className="hidden w-[100%] md:table lg:w-[710px]">
              <TableHeader>
                <TableRow className="text-[#808080]">
                  <TableHead className="md:w-[310px] lg:w-[290px]">
                    Product
                  </TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.product}>
                    <TableCell className="flex p-[20px]">
                      <Image
                        src={invoice.src}
                        width={50}
                        height={50}
                        alt="inv001"
                        className="mr-[30px]"
                      />
                      <div className="max-w-[150px] text-[#1A1A1A]">
                        {" "}
                        {invoice.product}
                      </div>
                    </TableCell>
                    <TableCell className="dark-green ">
                      {invoice.price}
                    </TableCell>
                    <TableCell>
                      <Count />
                    </TableCell>
                    <TableCell className="dark-green">
                      {invoice.totalPrise}
                    </TableCell>
                    <TableCell className="p-0 pr-[10px] text-right">
                      <CrossCircledIcon
                        className="h-[20px] w-[20px] cursor-pointer"
                        style={{ color: "#374151" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table className="table w-[100%] md:hidden lg:w-[710px]">
              <TableBody className="flex flex-col">
                {invoices.map((invoice) => (
                  <TableRow key={invoice.product}>
                    <TableCell className="flex justify-between px-[20px] pb-[10px] pt-[20px]">
                      <div className="flex">
                        <Image
                          src={invoice.src}
                          width={50}
                          height={50}
                          alt="inv001"
                          className="mr-[30px]"
                        />
                        <div className="max-w-[150px] text-[16px] text-[#1A1A1A]">
                          {" "}
                          {invoice.product}
                        </div>
                      </div>
                      <div className="p-0 pr-[10px] text-right">
                        <CrossCircledIcon
                          className="h-[20px] w-[20px] cursor-pointer"
                          style={{ color: "#374151" }}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="flex items-center justify-between pt-[10px]">
                      <Count />
                      <div className="dark-green text-[20px]">
                        {invoice.totalPrise}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/*------- 2---- */}
          <div className="h-[300px] w-[300px] rounded-[8px] border-2 border-[#E6E6E6] px-[16px] py-[24px] md:w-[230px]">
            <h2 className="mb-[10px] text-[20px]">To pay</h2>
            <Table>
              <TableFooter>
                <TableRow className="border-b text-[#808080]">
                  <TableCell className="rounded-[8px] px-0  py-3" colSpan={3}>
                    Price
                  </TableCell>
                  <TableCell className="dark-green px-0 py-3 text-right text-[16px]">
                    46$
                  </TableCell>
                </TableRow>
                <TableRow className="text-[#808080]">
                  <TableCell className="px-0 py-3" colSpan={3}>
                    Delivery
                  </TableCell>
                  <TableCell className="px-0 py-3 text-right text-[16px] text-black">
                    Free
                  </TableCell>
                </TableRow>
                <TableRow className="text-[#808080]">
                  <TableCell className="px-0 py-3" colSpan={3}>
                    Total
                  </TableCell>
                  <TableCell className="dark-green px-0 py-3 text-right text-[16px]">
                    $2,500.00
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <ButtonCustom
              text="Continue"
              href="/"
              className="mt-[30px] w-[100%]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
