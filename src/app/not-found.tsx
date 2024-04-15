import Button from "@/components/button";
import H2 from "@/components/h1";

export default function notFound() {
  return (
    <section className="container py-[44px]">
      <H2 text="Page not found" />
      <div className="m-auto flex flex-col justify-center">
        <div className="my-[50px] flex justify-center">
          <div className="flex h-[150px] items-center text-[150px] text-gray-900 sm:h-[200px] sm:text-[200px] lg:h-[300px] lg:text-[300px]">
            4
            <span className="flex h-[150px] items-center  text-[#FCA600] sm:h-[200px]  lg:h-[300px]">
              0
            </span>
            4
          </div>
          <div className="h-[50px] w-[50px] rotate-90 text-[32px] lg:text-[40px] ">
            error
          </div>
        </div>
        <div className="text-center text-[16px] text-[#1A1A1A]">
          Page not found.
        </div>
        <div className="text-center text-[16px] text-[#1A1A1A]">
          It may have been moved, or you simply entered the page address
          incorrectly.
        </div>
        <Button text="Home Page" href="/" className="m-auto mt-[45px]" />
      </div>
    </section>
  );
}
