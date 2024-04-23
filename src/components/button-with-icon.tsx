import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
  icon: string;
};

export default function ButtonWithIcon({
  text,
  href,
  className,
  icon,
}: ButtonProps) {
  return (
    <Link href={href} className="flex ">
      <button
        className={cn(`green-bg px-[40px] py-[16px] text-white flex justify-between rounded-[43px]`, className)}
      >
        {text}
        <Image src={icon} alt={text} width={20} height={20} className='ml-[10px] lg:ml-[20px]'/>
      </button>
    </Link>
  );
}
