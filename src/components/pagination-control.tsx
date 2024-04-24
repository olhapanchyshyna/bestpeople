import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'


const btnClass =
  "rounded-[50%] border-2 px-[5px] py-[7px] h-[30px] border-[#E6E6E6] disabled:opacity-50 disabled:bg-[#F2F2F2] ";

type PaginationControlProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationControl({
  currentPage,
  setCurrentPage,
}: PaginationControlProps) {
  return (
    <section className="m-auto mb-[50px] flex w-[300px] justify-between">
      <button
        disabled={currentPage === 1}
        className={btnClass}
        onClick={() => {
          if (currentPage === 1) return;
          setCurrentPage((prev) => prev - 1);
        }}
      >
        <ChevronLeftIcon  />
      </button>
      <div className='green-bg text-white p-[7px] rounded-[50%]'>{currentPage}</div>
      <button
        className={btnClass}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <ChevronRightIcon  />
      </button>
    </section>
  );
}
