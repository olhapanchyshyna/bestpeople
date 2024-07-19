import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type ButtonProps = {
  text: string;
  className?: string;
  href: string;
  disabled?: boolean;
  onClick?: () => void; // Добавьте обработчик клика как опциональный пропс
};

export default function ButtonCustom({
  text,
  className,
  href,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick} // Передайте обработчик клика в компонент Button
      className={cn(
        `green-bg  text-white hover:bg-[#6e860b] hover:text-white`,
        className,
      )}
    >
      <Link href={href} className='px-[40px] py-[16px]'>{text}</Link>
    </Button>
  );
}
