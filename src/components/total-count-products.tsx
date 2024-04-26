export default function TotalCountProducts({ totalCount }: { totalCount: number }) {
  return (
    <div className="mr-[20px] hidden items-end justify-end md:flex">
      <span className="mr-[5px] font-bold">{totalCount}</span> goods
    </div>
  );
}
