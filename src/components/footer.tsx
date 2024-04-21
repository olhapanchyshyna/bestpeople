import Image from "next/image";
import Link from "next/link";
import Phone from "./phone";

export default function Footer() {
  return (
    <footer className="h-full bg-[url('/footer-bg.png')] bg-cover bg-no-repeat pb-[30px] pt-[25px] md:pt-[50px]">
      <div className="container flex flex-col justify-between border-t-2 border-slate-400  md:h-[300px]">
        <div className="mt-[30px] flex flex-col items-start justify-between min-[440px]:items-center md:flex-row md:items-start">
          {/* 1 */}
          <div className="mb-[40px] flex flex-col justify-between md:mb-0 md:h-[150px]">
            <Link href="/">
              <Image src="/logo-white.svg" alt="logo" width={100} height={100} />
            </Link>
            <p className="mt-[10px] text-base text-[#E1E1E1] md:mt-0">
              Smart products for your health
            </p>
            <p className="hidden text-sm font-thin text-[#E1E1E1] opacity-65 md:flex">
              Privacy Policy
            </p>
            <p className="hidden text-sm font-light text-[#E1E1E1] opacity-65 md:flex">
              Public offer
            </p>
          </div>
          <div className="mb-[40px] flex w-[250px] justify-between  md:mb-0 lg:w-[300px]">
            {/* 2 */}
            <div className="h-[150px]">
              <ul className="flex h-full flex-col justify-between text-[#E1E1E1]">
                <li className="green">Catalog</li>
                <li>Shop</li>
                <li>My office</li>
                <li>Most selled</li>
              </ul>
            </div>
            {/* 3 */}
            <div className="h-[150px]">
              <ul className="flex h-full flex-col justify-between text-[#E1E1E1]">
                <li className="green">Best&People</li>
                <li>About Company</li>
                <li>Possibilities</li>
                <li>Contacts</li>
              </ul>
            </div>
          </div>

          {/* 4 */}
          <div className="h-[100px]">
            <ul className="flex h-full flex-col justify-between text-[#E1E1E1]">
              <li className="green">
                {" "}
                <Phone type="footer" width={20} height={20} />{" "}
              </li>
              <li className="flex">
                <Image
                  src="/email-green.svg"
                  alt="email"
                  width={15}
                  height={15}
                  className="mr-[10px]"
                />
                example@gmail.com
              </li>
              <li className="flex">
                <Image
                  src="/watch-green.svg"
                  alt="watch"
                  width={15}
                  height={15}
                  className="mr-[10px]"
                />
                24/7
              </li>
            </ul>
          </div>
        </div>

        <small className="mt-[50px]  min-[440px]:text-center text-[#4f5155] md:mt-0 md:text-left">
          ©Best&People All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}
