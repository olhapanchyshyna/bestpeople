import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
});

const advantagesCountItems = [
  {
    title: "Product line",
    count: "37+",
  },
  {
    title: "Satisfied clients",
    count: "500+",
  },
  {
    title: "Business partners",
    count: "28",
  },
  {
    title: "Turnover of goods",
    count: "750k+",
  },
];

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

export default function Advantages() {
  return (
    <section>
      <div className="bg-[url('/advantages-bg.png')] bg-cover bg-no-repeat px-[20px] py-[30px] md:py-[130px] lg:px-0">
        <div className="container flex flex-col flex-wrap items-center justify-center md:flex-row lg:justify-between">
          {advantagesCountItems.map((item, index) => {
            return (
              <Card
                key={index}
                className="mx-[5px] my-[5px] w-full max-w-[230px] border-[#ffffff1c] bg-[#ffffff1c] text-center lg:mx-0 lg:mb-0"
              >
                <CardHeader>
                  <CardTitle
                    className={cn(poppins.className, "green text-[42px] lg:text-[52px]")}
                  >
                    {item.count}
                  </CardTitle>
                  <CardDescription className="text-[16px] text-white">
                    {item.title}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
      <div
        className="container my-[40px] md:my-[60px] px-[20px] md:py-[40px] lg:px-[15px] rounded-[10px] "
        style={{ boxShadow: "0px 8px 40px rgba(0, 38, 3, 0.08)" }}
      >
        <div className="py-[20px] lg:py-0 flex flex-col flex-wrap items-center justify-center md:flex-row lg:justify-between ">
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
    </section>
  );
}

// ;
