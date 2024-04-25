"use client";

import { useState } from "react";
import GoodsList from "./goods-list";
import PaginationControl from "./pagination-control";

type CatalogListWrapperProps = {
  page: number;
};

export default function CatalogListWrapper({ page }: CatalogListWrapperProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);

  const prevPath = page > 1 ? `/catalog?page=${page - 1}` : "";
  const nextPath = totalCount > 3 * page ? `/catalog?page=${page + 1}` : "";

  return (
    <div>
      <div className="mb-[60px] md:w-[800px]">
        <GoodsList category="all" page={page}  setTotalCount={setTotalCount}/>
      </div>

      <PaginationControl
        prevPath={prevPath}
        nextPath={nextPath}
        currentPage={page}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}