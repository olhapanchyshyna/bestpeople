import { cn } from "@/lib/utils";
import Image from "next/image";

type PhoneProps = {
  type: "header" | "footer";
  width: number;
  height: number;
  className?: string;
};

export default function Phone({ type, width, height, className }: PhoneProps) {
  return (
    <div className={cn(`flex items-center`, className)}>
      <Image
        src={type === "header" ? "/phone-yellow.svg" : "/phone-green.svg"}
        className="mr-[10px]"
        width={width}
        height={height}
        alt="phone"
      />
      <a className={`${type === "header" ? "dark-green" : "green"} text-xl`} href="tel:+380954633976">
        095 463 39 76
      </a>
    </div>
  );
}
