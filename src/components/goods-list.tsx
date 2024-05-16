"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { getGoods } from "@/lib/actions/get/get-goods";
import { Goods } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SkeletonCard } from "./skeleton-card";

type GoodsListProps = {
  category: string;
  page?: number;
  isPending?: boolean;
  setTotalCount?: Dispatch<SetStateAction<number>>;
  setIsPending?: Dispatch<SetStateAction<boolean>>;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

export default function GoodsList({
  category,
  page = 1,
  isPending,
  setTotalCount,
  setIsPending,
  minPrice = "",
  maxPrice = "",
  sort = "fromcheap",
}: GoodsListProps) {
  const [isError, setIsError] = useState(false);
  const [goods, setGoods] = useState<Goods[]>([]);

  useEffect(() => {
    getGoods(category, +page, minPrice, maxPrice, sort)
      .then(({ goods, totalCount }) => {
        setIsPending && setIsPending(false);
        setGoods(goods);
        setTotalCount && setTotalCount(totalCount);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных", error);
        setIsPending && setIsPending(false);
        setIsError(true);
      });
  }, [category, page, setTotalCount, setIsPending, minPrice, maxPrice, sort]);

  function isValidImageUrl(url: string) {
    // Проверяем, начинается ли URL с "/" (относительный путь) или "http://" или "https://"
    return (
      typeof url === "string" &&
      (url.startsWith("/") ||
        url.startsWith("http://") ||
        url.startsWith("https://"))
    );
  }

  return (
    <section className="container flex flex-col flex-wrap justify-center p-0 sm:flex-row sm:justify-between">
      {isPending && <SkeletonCard />}
      {isError && <p>Error</p>}
      {goods.length === 0 && !isPending && !isError && (
        <div className="flex md:h-[350px] max-w-[800px] m-auto flex-col justify-evenly items-center border-none px-[10px] pb-[20px] pt-[10px] text-center text-[22px]">
          <Image
            src="/product-not-found.png"
            alt="product-not-found"
            width={150}
            height={150}
            className=" m-auto my-0"
          />
          <div>
            Products not found.
            <br />
            Please select another filter
          </div>
        </div>
      )}
      {!isPending &&
        !isError &&
        goods.map((good) => {
          // Парсинг good.img в массив изображений
          const imgArray = JSON.parse(good.img);

          // Убедитесь, что imgArray является массивом
          if (!Array.isArray(imgArray)) {
            console.error("good.img не является массивом изображений");
            return null;
          }
          return (
            <Link
              href={`/catalog/${good.slug}`}
              key={good.id}
              className="m-auto max-w-[300px] md:m-0"
            >
              <Card
                className="my-[5px] flex h-[220px] w-[300px] flex-col  items-center justify-between rounded-[8px] px-[10px] pb-[20px] pt-[20px] hover:border-[#6e860b] sm:h-[350px] sm:w-[240px] sm:px-[21px] sm:pb-[30px] sm:pt-[60px] md:m-[5px] md:w-[240px]"
                style={{ boxShadow: "-1px 4px 40px -8px rgba(0 0 0 / 21%)" }}
              >
                {/* Проверяем, валиден ли URL изображения */}
                {isValidImageUrl(imgArray[0]) && (
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={good.mobileImg}
                    />
                    <Image
                      src={imgArray[0]} // Используем первое изображение из массива
                      alt=""
                      width={135}
                      height={130}
                      className="mb-[10px] max-h-[160px] w-[120px] sm:mb-0 sm:w-[125px] md:w-[110px]"
                    />
                  </picture>
                )}

                <CardFooter className="items-end p-0">
                  <div>
                    <CardTitle className="mb-[10px] text-[14px] font-normal text-gray-700">
                      {good.title}
                    </CardTitle>
                    <CardDescription className="dark-green text-[16px] font-bold">
                      {good.price}$
                    </CardDescription>
                  </div>
                  <button className="btn btn-green">
                    <Image
                      src="/basket-green.svg"
                      alt="basket-green"
                      width={17}
                      height={22}
                      className="w-[17px] max-w-[17px]"
                    />
                  </button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
    </section>
  );
}
