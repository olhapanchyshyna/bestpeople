import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
});

const advantagesItems = [
  {
    title: "Free shipping",
    descr: "from 100$",
    img: "/delivery-truck-green.svg",
  },
  {
    title: "24/7 support",
    descr: "Personal consultant",
    img: "/headphones-green.svg",
  },
  {
    title: "Secure payments",
    descr: "Secure connection",
    img: "/shopping-bag-green.svg",
  },
  {
    title: "Careful packaging",
    descr: "Protective film",
    img: "/package-green.svg",
  },
];

export default function Services({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `container my-[40px] rounded-[10px] px-[20px] md:my-[60px] md:py-[40px] lg:px-[15px] `,
        className,
      )}
      style={{ boxShadow: "0px 8px 40px rgba(0, 38, 3, 0.08)" }}
    >
      <div className="flex flex-col flex-wrap items-center justify-center py-[20px] md:flex-row lg:justify-between lg:py-0 ">
        {advantagesItems.map((item, index) => {
          return (
            <div
              key={index}
              className="mx-[5px] my-[15px] flex w-full max-w-[230px] border-none bg-[#ffffff00] text-center lg:mx-0 lg:mb-0"
            >
              <Image src={item.img} alt="d" width={30} height={30} />
              <div className="ml-[10px] flex flex-col text-left">
                <h3
                  className={cn(
                    poppins.className,
                    "mb-[5px] text-[16px] text-black",
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-400">{item.descr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
