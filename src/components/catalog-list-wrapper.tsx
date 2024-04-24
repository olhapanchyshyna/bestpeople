"use client";

import { useState } from "react";
import GoodsList from "./goods-list";
import PaginationControl from "./pagination-control";

export default function CatalogListWrapper() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>
      <div className="mb-[60px] md:w-[800px]">
        <GoodsList category="all" page={currentPage} />
      </div>

      <PaginationControl
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
