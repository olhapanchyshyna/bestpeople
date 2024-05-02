import { cn } from '@/lib/utils'
import React from 'react'

type H2Props = {
  text: string;
  className?: string;
};

export default function H2({ text, className }: H2Props) {
	return (
		<h2
		className={cn(
			`text-[30px] lg:text-[40px] text-[#1A1A1A] font-bold leading-[35px]`,
			className,
		)}
	>
		{text}
	</h2>
	)
}
