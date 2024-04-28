import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
  onClick?: () => void; // Добавьте обработчик клика как опциональный пропс
};

export default function ButtonCustom({
  text,
  className,
  href,
  onClick,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick} // Передайте обработчик клика в компонент Button
      className={cn(
        `green-bg px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white`,
        className,
      )}
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}
