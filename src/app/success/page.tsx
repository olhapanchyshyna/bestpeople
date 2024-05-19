import ButtonCustom from "@/components/button";
import H2 from "@/components/h2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getGoodsById } from "@/lib/actions/get/get-goods-by-id";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const cookieGoodsArrays = session
    ? await getGoodsBasketByUserId(session?.user?.id)
    : null;

  const a = cookieGoodsArrays?.map((item) => +item.id);
  const goods = await getGoodsById(a);

  const goodsWithQuantity = goods.map((good) => {
    const currentGood = cookieGoodsArrays?.find(
      (item) => item.id === good.id.toString(),
    );
    return {
      ...good,
      quantity: currentGood?.quantity || 1,
    };
  });

  return (
    <section className="container m-auto mt-[20px] mb-[50px] md:my-[50px] flex flex-col">
      <H2 text="Payment was successful" className="" />

      <div className="dark-green mb-[30px] mt-[70px] text-center text-[30px]">
        Your order
      </div>

      <Table className="m-auto w-[100%] md:w-[60%]">
        <TableHeader>
          <TableRow className="text-[#808080]">
            <TableHead className="md:w-[310px] lg:w-[290px]">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {goodsWithQuantity.map((invoice) => {
            const imgArray = JSON.parse(invoice.img);
            const currentGood = cookieGoodsArrays?.find(
              (item) => item.id === invoice.id.toString(),
            );

            return (
              <TableRow key={invoice.title}>
                <TableCell className="p-0">
                  <Link
                    href={`/catalog/${invoice.slug}`}
                    className="flex p-[20px] flex-col sm:flex-row"
                  >
                    <Image
                      src={imgArray[0]}
                      width={50}
                      height={50}
                      alt="inv001"
                      className="mr-[30px] mb-[10px] sm:mb-0"
                    />
                    <div className="max-w-[150px] text-[#1A1A1A]">
                      {" "}
                      {invoice.title}
                    </div>
                  </Link>
                </TableCell>

                <TableCell>{invoice.quantity}</TableCell>
                <TableCell className="dark-green">
                  {currentGood
                    ? currentGood?.quantity * invoice.price
                    : invoice.price}
                  $
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ButtonCustom text="Home Page" href="/" className="m-auto mt-[45px]" />
    </section>
  );
}
