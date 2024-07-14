"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { useGoodsStore } from "@/lib/store/useGoods";
import { Goods } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { SkeletonCard } from "./skeleton-card";

type GoodsListProps = {
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  initialGoods: Goods[];
  isPending?: boolean;
  search?: string;
  setIsPending?: Dispatch<SetStateAction<boolean>>;
  setTotalCount?: Dispatch<SetStateAction<number>>;
};

export default function GoodsList({
  minPrice = "",
  maxPrice = "",
  sort = "cheap",
  initialGoods,
  setIsPending,
  isPending,
  search,
  setTotalCount,
}: GoodsListProps) {
  const { setGoods, goods, filteredGoods, setFilteredGoods } = useGoodsStore();

  const minPriceNumber = minPrice ? parseFloat(minPrice) : undefined;
  const maxPriceNumber = maxPrice ? parseFloat(maxPrice) : undefined;
  const itemsPerPage = 6;

  useLayoutEffect(() => {
    setGoods(initialGoods);
  }, [initialGoods, setGoods]);

  const filteredAndSortedGoods = useMemo(() => {
    let filtered = goods;

    if (!filtered) return undefined;

    if (minPriceNumber !== undefined) {
      filtered = filtered.filter((good) => good.price >= minPriceNumber);
    }
    if (maxPriceNumber !== undefined) {
      filtered = filtered.filter((good) => good.price <= maxPriceNumber);
    }

    if (search && search.toLowerCase().trim() !== "all") {
      const searchTerm = search.toLowerCase().trim();
      filtered = filtered.filter((good) => {
        const titleMatch = good.title.toLowerCase().includes(searchTerm);
        const categoryMatch = good.category.toLowerCase().includes(searchTerm);
        return titleMatch || categoryMatch;
      });
    }

    if (sort === "cheap") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "expensive") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [goods, minPriceNumber, maxPriceNumber, sort, setIsPending, search]);

  useEffect(() => {
    if (filteredAndSortedGoods !== undefined) {
      setFilteredGoods(filteredAndSortedGoods);
    }
  }, [filteredAndSortedGoods, setFilteredGoods]);

  useEffect(() => {
    if (setIsPending) {
      setIsPending(false);
    }
    if (filteredGoods) {
      setTotalCount && setTotalCount(filteredGoods?.length);
    }
  }, [filteredAndSortedGoods, setIsPending, filteredGoods]);

  // const paginatedGoods = useMemo(() => {
  //   if (!filteredGoods) return [];
  //   const startIndex = (page - 1) * itemsPerPage;
  //   return filteredGoods.slice(startIndex, startIndex + itemsPerPage);
  // }, [filteredGoods, page]);

  function isValidImageUrl(url: string) {
    return (
      typeof url === "string" &&
      (url.startsWith("/") ||
        url.startsWith("http://") ||
        url.startsWith("https://"))
    );
  }

  if (!filteredGoods) {
    return null;
  }

  return (
    <section className="container flex flex-col flex-wrap justify-center p-0 sm:flex-row sm:justify-between">
      {isPending && <SkeletonCard />}
      {filteredGoods.length === 0 && !isPending && (
        <div className="m-auto flex max-w-[800px] flex-col items-center justify-evenly border-none px-[10px] pb-[20px] pt-[10px] text-center text-[22px] md:h-[350px]">
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
        filteredGoods.map((good) => {
          const imgArray = JSON.parse(good.img);
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
                {isValidImageUrl(imgArray[0]) && (
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={good.mobileImg}
                    />
                    <Image
                      src={imgArray[0]}
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
                </CardFooter>
              </Card>
            </Link>
          );
        })}
    </section>
  );
}
