import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const btnClass =
  "rounded-[50%] border-2 px-[5px] py-[7px] h-[30px] border-[#E6E6E6] ";

type PaginationControlProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
};

export default function PaginationControl({
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
              href="#"
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage((prev) => prev - 1);
              }}
              className={cn(btnClass, {
                "bg-[#F2F2F2] opacity-50": currentPage === 1,
              })}
            />
          </PaginationItem>

          {/* <PaginationItem>
            <PaginationLink
              className=""
              href="#"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem> */}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  "rounded-[50%] p-[7px] text-[#666666]",
                  currentPage === page
                    ? "green-bg rounded-[50%] p-[7px] text-white"
                    : "",
                )}
                href="#"
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (currentPage === totalPages) return;
                setCurrentPage((prev) => prev + 1);
              }}
              className={cn(btnClass, {
                "bg-[#F2F2F2] opacity-50": currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
