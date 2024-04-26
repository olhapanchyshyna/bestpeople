import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const buttonClass =
  "rounded-[50%] border-2 px-[5px] py-[7px] h-[30px] border-[#E6E6E6]";

type PaginationControlProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  prevPath: string;
  nextPath: string;
  search: string;
};

export default function PaginationControl({
  prevPath,
  nextPath,
  currentPage,
  setCurrentPage,
  totalCount,
  search
}: PaginationControlProps) {
  const totalPages = Math.ceil(totalCount / 3);

  const renderPageNumbers = () => {
    const pages = [];

    // Если всего мало страниц, показываем все номера
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если есть много страниц, показываем текущую и соседние
      const startPage = currentPage === 1 ? 1 : currentPage - 1;
      const endPage = currentPage === totalPages ? totalPages : currentPage + 1;

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("ellipsis");
        }
      }

      // Добавляем страницы вокруг текущей
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("ellipsis");
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <section className="m-auto mb-[50px] flex w-[300px] justify-between">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? prevPath : undefined}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              className={cn(buttonClass, {
                "bg-[#F2F2F2] opacity-50": currentPage === 1,
              })}
            />
          </PaginationItem>

          {/* Рендеринг номеров страниц */}
          {renderPageNumbers().map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={`/catalog?category=${search}&page=${item}`}
                    isActive={currentPage === item}
                    className={cn(
                      "rounded-[50%] p-[7px] text-[#666666]",
                      currentPage === item &&
                        "green-bg rounded-[50%] p-[7px] text-white",
                    )}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? nextPath : undefined}
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              className={cn(buttonClass, {
                "bg-[#F2F2F2] opacity-50": currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
