import Image from "next/image";
import Button from "./button";

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
      <div className='container'>
        <div className="mb-[20px] text-center lg:text-left order-1 lg:order-none">
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

        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between">
          <div className='order-3 lg:order-none'>
            {benefitsItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mb-[10px] flex lg:items-center items-start"
                >
                  <Image
                    src="/checkmark-circle-green.svg"
                    alt="checkmark-circle"
                    width={15}
                    height={15}
                    className='mt-[5px] lg:mt-0'
                  />
                  <h3 className="ml-[7px] text-[16px] text-black">
                    {item.title}
                  </h3>
                </div>
              );
            })}
            <Button text="More" className="lg:mt-[55px] mt-[20px]" />
          </div>
          <div >
            <Image
            className='order-2 lg:order-none mb-[40px] lg:mb-0'
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