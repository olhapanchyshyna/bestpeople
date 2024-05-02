import H2 from "@/components/h2";
import TextWithIcon from "@/components/text-with-icon";
import Image from "next/image";

const items = [
  {
    icon: "/2024-green.svg",
    imgWidthlg: "w-[140px]",
    imgWidth: "w-[110px]",
    title: "Start sales",
    descr:
      "Creation of a company for the production of products for a balanced diet and their promotion through Independent Partners",
  },
  {
    icon: "/two-bottle-green.svg",
    imgWidthlg: "w-[94px]",
    imgWidth: "w-[70px]",
    title: "Product line",
    descr:
      "Large product line. The company's products are based on the latest scientific achievements",
  },
  {
    icon: "/certificate-green.svg",
    imgWidthlg: "w-[81px]",
    imgWidth: "w-[60px]",
    title: "Control product quality",
    descr:
      "The company provides a high level of quality control at all stages of the production cycle",
  },
  {
    icon: "/handshake-green.svg",
    imgWidthlg: "w-[94px]",
    imgWidth: "w-[80px]",
    title: "Privilege partners",
    descr: "Helping Independent Partners achieve personal business goals",
  },
];

const ourMissionItems = [
  {
    title:
      "We use progressive biohacking to create innovative products that can make every person more efficient and successful, increase the cognitive functions of the brain, and qualitatively enhance the capabilities of the whole organism.",
  },
  {
    title:
      "Provide an opportunity for Independent Partners to conduct profitable business in partnership with the company.",
  },
  {
    title: "For Clients - to use quality products for a healthy lifestyle",
  },
  {
    title:
      "We actively implement scientific discoveries and advanced technologies, create innovative products with proven effectiveness for a full and high-quality life.",
  },
];

export default function Page() {
  return (
    <section className="container flex flex-col py-[50px] md:pb-[100px] md:pt-[65px]">
      {/* 1 */}
      <div>
        <H2 text="About Company" className="mb-[30px]" />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="order-2 w-[100%] max-w-[430px] md:order-none lg:max-w-[500px]">
            <p>
              <strong>BEST & PEOPLE</strong> is a young, ambitious company
              created in 2024 by a team of experienced MLM entrepreneurs and
              professionals in the field of balanced nutrition, which helps
              people around the world lead an active and healthy lifestyle.
            </p>
            <br />
            <p>
              We have a completely new, innovative reward system that will allow
              each partner to feel the delights and advantages of a network
              business from the very first steps. We have created special
              loyalty programs to support both young and experienced MLM
              entrepreneurs.
            </p>
          </div>
          <Image
            src="/logo-color-big.png"
            alt="About Company"
            width={300}
            height={120}
            className="order-1 mb-[35px] h-[90px] w-[280px] md:order-none md:mb-0 md:ml-[20px] lg:h-[120px] lg:w-[380px]"
          />
        </div>
      </div>

      {/* 2 */}
      <div className="mt-[80px] flex flex-wrap justify-center md:mt-[140px] md:justify-between">
        {items.map((item, index) => (
          <div
            key={index}
            className="mb-[50px] flex w-[100%] max-w-[300px] flex-col items-start md:mb-[80px] lg:max-w-[480px] lg:flex-row lg:items-center lg:justify-end"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={60}
              height={60}
              className={`${item.imgWidth}  lg:${item.imgWidthlg} mb-[20px] ml-[20px] lg:mb-0  lg:ml-0`}
            />
            <div className="ml-[20px] max-w-[300px] lg:ml-[40px]">
              <div className="dark-green mb-[15px] text-[20px]">
                {item.title}
              </div>
              <p className="text-[16px]">{item.descr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3 */}
      <div>
        <div className="mt-[50px] flex flex-col items-center justify-between md:flex-row">
          <Image
            src="/logo-with-leaves.png"
            alt="About Company"
            width={520}
            height={220}
            className="mb-[40px] mr-[20px] h-[120px] w-[280px] sm:w-[320px] md:mb-0 lg:h-[180px] lg:w-[420px]"
          />
          <div className="w-[100%] max-w-[400px] lg:max-w-[450px]">
            <H2 text="Our mission" className="mb-[20px] md:mb-[30px]" />
            <TextWithIcon
              Items={ourMissionItems}
              iconSrc="/check-mission-green.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
