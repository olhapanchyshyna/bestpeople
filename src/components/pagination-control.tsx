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

const buttonClass = "rounded-[50%] border-2 px-[5px] py-[7px] h-[30px] border-[#E6E6E6]";

type PaginationControlProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  prevPath: string;
  nextPath: string;
};

export default function PaginationControl({
  prevPath,
  nextPath,
  currentPage,
  setCurrentPage,
  totalCount,
}: PaginationControlProps) {
  const totalPages = Math.ceil(totalCount / 3);

  return (
    <section className="m-auto mb-[50px] flex w-[300px] justify-between">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={ currentPage > 1 ? prevPath : undefined}
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

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`/catalog?page=${page}`}
                isActive={currentPage === page}
                className={cn(
                  "rounded-[50%] p-[7px] text-[#666666]",
                  currentPage === page && "green-bg rounded-[50%] p-[7px] text-white"
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

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
