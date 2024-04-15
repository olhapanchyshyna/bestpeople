import H2 from "@/components/h1"
import TextWithIcon from '@/components/text-with-icon'
import Image from "next/image"

const items = [
  {
    icon: "/2024-green.svg",
    imgWidth: "w-[140px]",
    title: "Start sales",
    descr:
      "Creation of a company for the production of products for a balanced diet and their promotion through Independent Partners",
  },
  {
    icon: "/two-bottle-green.svg",
    imgWidth: "w-[94px]",
    title: "Product line",
    descr:
      "Large product line. The company's products are based on the latest scientific achievements",
  },
  {
    icon: "/certificate-green.svg",
    imgWidth: "w-[81px]",
    title: "Control product quality",
    descr:
      "The company provides a high level of quality control at all stages of the production cycle",
  },
  {
    icon: "/handshake-green.svg",
    imgWidth: "w-[94px]",
    title: "Privilege partners",
    descr: "Helping Independent Partners achieve personal business goals",
  },
];

const ourMissionItems = [
  {
    title: "We use progressive biohacking to create innovative products that can make every person more efficient and successful, increase the cognitive functions of the brain, and qualitatively enhance the capabilities of the whole organism.",
  },
  {
    title: "Provide an opportunity for Independent Partners to conduct profitable business in partnership with the company.",
  },
  {
    title: "For Clients - to use quality products for a healthy lifestyle",
  },
  {
    title: "We actively implement scientific discoveries and advanced technologies, create innovative products with proven effectiveness for a full and high-quality life.",
  },
];

export default function Page() {
  return (
    <section className="container flex flex-col pb-[100px] pt-[65px]">
      {/* 1 */}
      <div className=" flex items-center justify-between">
        <div className="w-[100%] max-w-[500px]">
          <H2 text="About Company" className="mb-[30px]" />
          <p>
            BEST & PEOPLE is a young, ambitious company created in 2024 by a
            team of experienced MLM entrepreneurs and professionals in the field
            of balanced nutrition, which helps people around the world lead an
            active and healthy lifestyle.
          </p>
          <br />
          <p>
            We have a completely new, innovative reward system that will allow
            each partner to feel the delights and advantages of a network
            business from the very first steps. We have created special loyalty
            programs to support both young and experienced MLM entrepreneurs.
          </p>
        </div>
        <Image
          src="/logo-color-big.png"
          alt="About Company"
          width={380}
          height={120}
          className="ml-[20px] h-[120px] w-[380px]"
        />
      </div>

      {/* 2 */}
      <div className="mt-[140px] flex flex-wrap justify-between">
        {items.map((item, index) => (
          <div
            key={index}
            className="mb-[80px] flex w-[100%] max-w-[480px] items-center justify-end"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={60}
              height={60}
              className={item.imgWidth}
            />
            <div className="ml-[40px] max-w-[300px]">
              <div className="dark-green mb-[15px] text-[20px]">
                {item.title}
              </div>
              <p className="text-[16px]">{item.descr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3 */}
      <div className="mt-[50px] flex items-center justify-between">
        <Image
          src="/logo-with-leaves.png"
          alt="About Company"
          width={520}
          height={220}
          className="ml-[20px] h-[180px] w-[420px]"
        />
        <div className="w-[100%] max-w-[450px]">
          <H2 text="Our mission" className="mb-[30px]" />
          <TextWithIcon Items={ourMissionItems} iconSrc="/check-mission-green.svg" />
        </div>
      </div>
    </section>
  );
}
