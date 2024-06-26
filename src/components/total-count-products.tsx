export default function TotalCountProducts({ totalCount }: { totalCount: number }) {
  return (
    <div className="hidden md:flex">
      <span className="mr-[5px] font-bold">{totalCount}</span> goods
    </div>
  );
}
