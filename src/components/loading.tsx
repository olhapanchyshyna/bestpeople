import { cn } from '@/lib/utils'
import Image from "next/image";


type LoadingProps = {
	className?: string;
};

export default function Loading({className} : LoadingProps) {
  return (
    <Image
      src="/loading.png"
      alt='loading'
      width={200}
      height={200}
      className={cn(
				`animate-spin duration-2000`,
				className,
			)}
    />
  );
}
