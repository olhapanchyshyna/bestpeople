import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ itemLength = 3 }) {
  return (
    <div className="container flex flex-wrap justify-center p-0 sm:justify-between">
      {Array.from({ length: itemLength }).map((_, index) => (
        <Skeleton
          key={index}
          className="m-[5px] rounded-[8px] bg-slate-300 px-[10px] pb-[20px] pt-[20px] sm:h-[350px] sm:w-[240px] sm:px-[21px] sm:pb-[30px] sm:pt-[60px]"
        />
      ))}
    </div>
  );
}
