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
			`text-[24px] sm:text-[30px] lg:text-[40px] text-[#1A1A1A]`,
			className,
		)}
	>
		{text}
	</h2>
	)
}
