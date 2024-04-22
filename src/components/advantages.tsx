import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Services from "./services";

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
                    className={cn(
                      poppins.className,
                      "green text-[42px] lg:text-[52px]",
                    )}
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
      <Services />
    </section>
  );
}

// ;
