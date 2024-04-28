"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GoodsList from "./goods-list";
import PaginationControl from "./pagination-control";
import SkeletonPagination from "./skeleton-pagination";

import TotalCountProducts from "./total-count-products";
import SortCombobox from './sort-combobox'


type CatalogListWrapperProps = {
  page: number;
};

export default function CatalogListWrapper({ page }: CatalogListWrapperProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("category") || "all";
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isPending, setIsPending] = useState(true);

  const prevPath =
    page > 1
      ? `/catalog?category=${search}&min=${minPrice}&max=${maxPrice}&page=${page - 1}`
      : "";
  const nextPath =
    totalCount > 3 * page
      ? `/catalog?category=${search}&min=${minPrice}&max=${maxPrice}&page=${page + 1}`
      : "";

  return (
    <div>
      <div className="mx-[20px] flex justify-between mb-[20px]">
        <SortCombobox />
        <TotalCountProducts totalCount={totalCount} />
      </div>

      <div className="mb-[60px] md:w-[800px]">
        <GoodsList
          minPrice={minPrice}
          maxPrice={maxPrice}
          category={search}
          page={page}
          setTotalCount={setTotalCount}
          setIsPending={setIsPending}
          isPending={isPending}
        />
      </div>

      {isPending ? (
        <SkeletonPagination />
      ) : (
        <PaginationControl
          minPrice={minPrice}
          maxPrice={maxPrice}
          prevPath={prevPath}
          nextPath={nextPath}
          currentPage={page}
          totalCount={totalCount}
          setCurrentPage={setCurrentPage}
          search={search}
        />
      )}
    </div>
  );
}
