import Aside from '@/components/aside'
import GoodsList from "@/components/goods-list";
import H2 from "@/components/h1";

export default function Page() {
  return (
    <div className="container">
      <H2 text="Catalog" className="mb-[30px]" />
      <div className="flex justify-between">
        <div className="mr-[20px] w-[240px]">
          <Aside/>
        </div>
        <div className="w-[800px]">
          <GoodsList category="all" />
        </div>
      </div>
    </div>
  );
}
