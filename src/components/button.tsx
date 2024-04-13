import { cn } from "@/lib/utils";

type ButtonProps = {
  text: string;
  className?: string;
};

export default function Button({ text, className }: ButtonProps) {
  return (
    <button
      className={cn(
        `green-bg rounded-[43px] px-[40px] py-[16px] text-white`,
        className,
      )}
    >
      {text}
    </button>
  );
}