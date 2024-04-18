import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
};

export default function ButtonCustom({ text, className, href }: ButtonProps) {
  return (
    <Button
      className={cn(`green-bg px-[40px] py-[16px] text-white`, className)}
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}
