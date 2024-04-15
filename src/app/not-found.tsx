import Button from "@/components/button";
import H2 from "@/components/h1";

export default function notFound() {
  return (
    <section className="container py-[44px]">
      <H2 text="Page not found" />
      <div className="m-auto flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="flex h-[300px] items-center text-[300px] text-gray-900">
            4
            <span className="flex h-[300px] items-center text-[#FCA600]">
              0
            </span>
            4
          </div>
          <div className="h-[50px] w-[50px] rotate-90 text-[40px] ">error</div>
        </div>
        <div className="text-center text-[16px] text-[#1A1A1A]">
          Page not found.
        </div>
        <div className="text-center text-[16px] text-[#1A1A1A]">
          It may have been moved, or you simply entered the page address
          incorrectly.
        </div>
        <Button text="Home Page" href='/' className="m-auto mt-[45px]" />
      </div>
    </section>
  );
}
