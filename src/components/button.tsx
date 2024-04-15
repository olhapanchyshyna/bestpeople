import { cn } from "@/lib/utils"
import Link from 'next/link'

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
};

export default function Button({ text, className, href }: ButtonProps) {
  return (
    <button
      className={cn(
        `green-bg rounded-[43px] px-[40px] py-[16px] text-white`,
        className,
      )}
    >
      <Link href={href}>{text}</Link>
    </button>
  );
}