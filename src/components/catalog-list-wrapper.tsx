"use client";

import { useState } from "react";
import GoodsList from "./goods-list";
import PaginationControl from "./pagination-control";

export default function CatalogListWrapper() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div>
      <div className="mb-[60px] md:w-[800px]">
        <GoodsList category="all" page={currentPage} setTotalCount={setTotalCount} />
      </div>

      <PaginationControl
        currentPage={currentPage}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
