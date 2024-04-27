import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
  onClick?: () => void; // Добавьте обработчик клика как опциональный пропс
  isActive?: boolean;
};

export default function ButtonCustom({
  text,
  className,
  href,
  onClick,
  isActive,
}: ButtonProps) {
  // console.log(isActive);
  return (
    <Button
      onClick={onClick} // Передайте обработчик клика в компонент Button
      className={cn(
        `green-bg px-[40px] py-[16px] text-white`,
        className,
        // isActive ? "bg-red-500" : "",
      )}
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}
