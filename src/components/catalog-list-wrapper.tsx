"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GoodsList from "./goods-list";
import PaginationControl from "./pagination-control";
import SkeletonPagination from "./skeleton-pagination";
import SortCombobox from "./sort-combobox";
import TotalCountProducts from "./total-count-products";
import { Goods } from '@prisma/client'
import { useGoodsStore } from '@/lib/store/useGoods'

type CatalogListWrapperProps = {
  initialAllGoods: Goods[];
  totalCount: number
};

export default function CatalogListWrapper({ initialAllGoods, totalCount: tc }: CatalogListWrapperProps) {
  const searchParams = useSearchParams();
  // const search = searchParams.get("category") || "all";
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "fromcheap";

  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(tc);
  const [isPending, setIsPending] = useState(true);

  const {category: search} = useGoodsStore()

  // const prevPath =
  //   page > 1
  //     ? `/catalog?category=${search}&min=${minPrice}&max=${maxPrice}&sort=${sort}&page=${page - 1}`
  //     : "";
  // const nextPath =
  //   totalCount > 3 * page
  //     ? `/catalog?category=${search}&min=${minPrice}&max=${maxPrice}&sort=${sort}&page=${page + 1}`
  //     : "";

  return (
    <div className='max-w-[750px] w-[100%]'>
      <div className="mx-[20px] mb-[90px] hidden items-center justify-between md:flex">
        <SortCombobox />
        <TotalCountProducts totalCount={totalCount} />
      </div>

      <div className="mb-[40px] md:mb-[60px] md:max-w-[750px] w-[100%]">
        <GoodsList
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          initialGoods={initialAllGoods}
          setIsPending={setIsPending}
          isPending={isPending}
          search={search}
          setTotalCount={setTotalCount}
        />
      </div>

      {/* {isPending ? (
        <SkeletonPagination />
      ) : ( */}
        {/* <PaginationControl
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          prevPath={prevPath}
          nextPath={nextPath}
          currentPage={page}
          totalCount={totalCount}
          setCurrentPage={setCurrentPage}
          search={search}
        /> */}
      {/* )} */}
    </div>
  );
}
