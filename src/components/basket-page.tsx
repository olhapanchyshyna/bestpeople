"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ButtonCustom from "@/components/button";
import Count from "@/components/count";
import DeleteGoodButton from "@/components/delete-good-button";
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
import { useBasketStore } from "@/lib/store/useBasketStore";
import { GoodCoookieType } from "@/types/types";
import { Goods } from "@prisma/client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";

type BasketPageProps = {
  goodsBasketByUserId: GoodCoookieType[] | undefined;
  goodsData: Goods[];
  session: Session | null;
};

export default function BasketPage({
  goodsBasketByUserId,
  goodsData,
  session,
}: BasketPageProps) {
  const { goodsBasket, isPending, setGoodsBasket } = useBasketStore();
  const [cookieGoodsArrays, setCookieGoodsArrays] = useState<
    GoodCoookieType[] | undefined
  >(goodsBasketByUserId);
  const [goods, setGoods] = useState<Goods[]>(goodsData);
  const [filteredItem, setFilteredItem] = useState<Goods[]>([]);

  // const portalId = document.querySelector('#portal-basket-icon')
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (session) {
  //       try {
  //         const cookieData = await getGoodsBasketByUserId(session?.user?.id);
  //         setCookieGoodsArrays(cookieData);
  //         const ids = cookieData?.map((item) => +item.id);
  //         const goodsData = await getGoodsById(ids);
  //         setGoods(goodsData);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         // setIsPending(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [session]);

  useEffect(() => {
    setGoodsBasket(goodsBasketByUserId);
  }, [goodsBasketByUserId]);

  useEffect(() => {
    if (goods && goodsBasket) {
      const filtered = goods.filter((item) =>
        goodsBasket.find((itemGood) => itemGood.id === item.id.toString()),
      );
      setFilteredItem(filtered);
      setCookieGoodsArrays(goodsBasket);
    }
  }, [goodsBasket, goods, session]);

  let deliveryCost = 0;
  let priseAllGoods = 0;

  return (
    <>
      <Breadcrumbs />
      <section className="container mb-[35px] mt-[44px] md:mb-[85px]">
        <H2 text="Basket" className="mb-[40px]" />
        <div className="flex flex-col justify-between lg:flex-row">
          {isPending ? (
            <Loading className="m-auto" />
          ) : (
            <div className="mb-[30px] md:rounded-[8px] md:border-2 md:border-[#E6E6E6] lg:mb-0">
              {filteredItem.length === 0 ? (
                <Table className="hidden w-[100%] md:table lg:w-[710px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-10 text-center">
                        <Image
                          src="/empty-basket.png"
                          width={100}
                          height={100}
                          alt="empty-basket"
                          className="m-auto mb-[20px]"
                        />
                        <p className="text-[20px]">No products in the basket</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table className="hidden w-[100%] md:table lg:w-[710px]">
                  <TableHeader className="hidden md:table-header-group">
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
                    {filteredItem.map((invoice) => {
                      const imgArray = JSON.parse(invoice.img);
                      const currentGood = cookieGoodsArrays?.find(
                        (item) => item.id === invoice.id.toString(),
                      );

                      if (currentGood && currentGood.quantity) {
                        priseAllGoods += currentGood.quantity * invoice.price;
                      }
                      return (
                        <TableRow key={invoice.title}>
                          <TableCell>
                            <Link
                              href={`/catalog/${invoice.slug}`}
                              className="flex p-[20px]"
                            >
                              <Image
                                src={imgArray[0]}
                                width={50}
                                height={50}
                                alt="inv001"
                                className="mr-[30px]"
                              />
                              <div className="max-w-[150px] text-[#1A1A1A]">
                                {invoice.title}
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="dark-green hidden md:table-cell">
                            {invoice.price}$
                          </TableCell>

                          <TableCell>
                            {/* <SessionProvider> */}
                              <Count
                                cookieGoodsArrays={cookieGoodsArrays}
                                currentGood={currentGood}
                                typeAction="inBasket"
                              />
                            {/* </SessionProvider> */}
                          </TableCell>
                          <TableCell className="dark-green">
                            {currentGood
                              ? currentGood.quantity * invoice.price
                              : invoice.price}
                            $
                          </TableCell>

                          <TableCell className="p-0 pr-[10px] text-right ">
                          {/* <SessionProvider> */}
                              <DeleteGoodButton
                                id={invoice.id}
                                cookieGoodsArrays={cookieGoodsArrays}
                              />
                            {/* </SessionProvider> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}

              {filteredItem.length === 0 ? (
                <Table className="table w-[100%] md:hidden lg:w-[710px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-10 text-center">
                        <Image
                          src="/empty-basket.png"
                          width={100}
                          height={100}
                          alt="empty-basket"
                          className="m-auto mb-[20px]"
                        />
                        <p className="text-[20px]">No products in the basket</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table className="table w-[100%] md:hidden lg:w-[710px]">
                  <TableBody className="flex flex-col">
                    {filteredItem.map((invoice) => {
                      const imgArray = JSON.parse(invoice.img);
                      const currentGood = cookieGoodsArrays?.find(
                        (item) => item.id === invoice.id.toString(),
                      );

                      return (
                        <TableRow key={invoice.title}>
                          <TableCell className="flex justify-between px-[20px] pb-[10px] pt-[20px]">
                            <Link
                              className="flex"
                              href={`/catalog/${invoice.slug}`}
                            >
                              <Image
                                src={imgArray[0]}
                                width={50}
                                height={50}
                                alt="inv001"
                                className="mr-[30px]"
                              />
                              <div className="max-w-[150px] text-[16px] text-[#1A1A1A]">
                                {invoice.title}
                              </div>
                            </Link>

                            {/* <SessionProvider> */}
                              <DeleteGoodButton
                                id={invoice.id}
                                cookieGoodsArrays={cookieGoodsArrays}
                              />
                            {/* </SessionProvider> */}
                          </TableCell>

                          <TableCell className="flex items-center justify-between pt-[10px]">
                            {/* <SessionProvider> */}
                              <Count
                                cookieGoodsArrays={cookieGoodsArrays}
                                currentGood={currentGood}
                                typeAction="inBasket"
                              />
                            {/* </SessionProvider> */}
                            <div className="dark-green text-[20px]">
                              {currentGood
                                ? currentGood.quantity * invoice.price
                                : invoice.price}
                              $
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          )}

          <div className="h-[300px] w-[300px] rounded-[8px] border-2 border-[#E6E6E6] px-[16px] py-[24px] md:w-[230px]">
            <h2 className="mb-[10px] text-[20px]">To pay</h2>
            <Table>
              <TableFooter>
                <TableRow className="border-b text-[#808080]">
                  <TableCell className="rounded-[8px] px-0  py-3" colSpan={3}>
                    Price
                  </TableCell>
                  <TableCell className="dark-green px-0 py-3 text-right text-[16px]">
                    {priseAllGoods}$
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
                    {deliveryCost === 0
                      ? priseAllGoods
                      : priseAllGoods + deliveryCost}
                    $
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <ButtonCustom
              disabled={filteredItem.length === 0}
              text="Continue"
              href="/plase-in-order"
              className="green-bg mt-[30px] w-[100%] rounded-[42px] px-[40px] py-[13px] text-white hover:bg-[#6e860b] hover:text-white"
            />
          </div>
        </div>
      </section>
      {/* {portalId && createPortal(<BasketIcon />, portalId)} */}
    </>
  );
}
