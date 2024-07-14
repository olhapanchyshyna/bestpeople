"use client";

import { useGoodsStore } from "@/lib/store/useGoods";
import { Goods } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GoodsList from "./goods-list";
import SortCombobox from "./sort-combobox";
import TotalCountProducts from "./total-count-products";

type CatalogListWrapperProps = {
  initialAllGoods: Goods[];
  totalCount: number;
};

export default function CatalogListWrapper({
  initialAllGoods,
  totalCount: tc,
}: CatalogListWrapperProps) {
  const searchParams = useSearchParams();
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "fromcheap";

  const [totalCount, setTotalCount] = useState(tc);
  const [isPending, setIsPending] = useState(true);

  const { category: search } = useGoodsStore();

  return (
    <div className="w-[100%] max-w-[750px]">
      <div className="mx-[20px] mb-[90px] hidden items-center justify-between md:flex">
        <SortCombobox />
        <TotalCountProducts totalCount={totalCount} />
      </div>

      <div className="mb-[40px] w-[100%] md:mb-[60px] md:max-w-[750px]">
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
