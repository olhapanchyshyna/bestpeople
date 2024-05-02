import Image from "next/image";

import ButtonCustom from "./button";
import TextWithIcon from "./text-with-icon";

const benefitsItems = [
  {
    title: "International company in the field of balanced nutrition",
  },
  {
    title: "Each product goes through 14 stages of testing",
  },
  {
    title: "Only natural ingredients and safe materials",
  },
  {
    title: "We contribute to the health of people around the world",
  },
];

export default function Benefits() {
  return (
    <section className=" flex flex-col bg-[#F7F8FA] py-[50px] lg:py-[90px]">
      <div className="container">
        <div className="order-1 mb-[20px] text-center lg:order-none lg:text-left">
          <h1
            className="dark-green text-[40px]"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            BEST&PEOPLE
          </h1>
          <p className="dark-green text-[16px]">
            Smart products for your health
          </p>
        </div>

        <div className="flex flex-col items-center justify-between lg:flex-row lg:items-end">
          <div className="order-3 lg:order-none">
            <TextWithIcon
              Items={benefitsItems}
              iconSrc="/checkmark-circle-green.svg"
            />

            <ButtonCustom
              text="More"
              href="/about-company"
              className="mt-[20px] lg:mt-[55px]"
            />
          </div>
          <div>
            <Image
              className="order-2 mb-[40px] lg:order-none lg:mb-0"
              src="/benefits.png"
              alt="d"
              width={380}
              height={400}
              style={{ boxShadow: " -6px 1px 72px -14px rgba(0,0,0,0.26)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
