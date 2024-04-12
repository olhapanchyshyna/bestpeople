'use client'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

import { type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'

const categoriesItems = [
	{
		id: 0,
		title: 'Detox',
		image: '/detox.svg',
		productCount: 165,
	},
	{
		id: 1,
		title: 'Anti-aging',
		image: '/hands.svg',
		productCount: 34,
	},
	{
		id: 2,
		title: 'Weight normalization',
		image: '/lemonade.svg',
		productCount: 34,
	},
	{
		id: 3,
		title: 'Healthy heart',
		image: '/bottle.svg',
		productCount: 165,
	},
	{
		id: 4,
		title: 'Relax',
		image: '/heart-with-lotos.svg',
		productCount: 48,
	},
	{
		id: 5,
		title: 'Immunity',
		image: '/bottle.svg',
		productCount: 23,
	},
	{
		id: 6,
		title: 'Beauty',
		image: '/heart-with-lotos.svg',
		productCount: 18,
	},
	{
		id: 7,
		title: 'Energy',
		image: '/lemonade.svg',
		productCount: 165,
	},
]

export default function CategorySlider() {
	const [embla, setEmbla] = useState<CarouselApi>()
	const [currentSlide, setCurrentSlide] = useState<number>(0)

	useEffect(() => {
		if (embla) {
			const onSwitch = () => {
				setCurrentSlide(embla.selectedScrollSnap())
			}

			embla.on('select', onSwitch)

			return () => {
				if (embla) {
					embla.off('select', onSwitch)
				}
			}
		}
	}, [embla])

	return (
		<section className='py-[90px] bg-[#f7fbe7]'>
			<Carousel
				setApi={setEmbla}
				opts={{
					align: 'start',
					loop: true,
				}}
				className='w-full max-w-5xl m-auto container'
			>
				<CarouselContent>
					{categoriesItems.map((item, index) => {
						return (
							<CarouselItem
								key={index}
								className={cn('md:basis-1/3 lg:basis-1/4 ')}
							>
								<div className='p-1'>
									<Card
										className={cn(
											item.id === currentSlide ? 'border-[#b3db11]' : ''
										)}
									>
										<CardContent className='flex flex-col aspect-square justify-between items-center text-center  py-[32px] px-[45px]'>
											<Image
												src={item.image}
												alt=''
												width={50}
												height={50}
												className='w-[60px] h-[60px]'
											/>
											<span
												className={cn(
													item.id === currentSlide ? 'text-[#75882d]' : '',
													'text-[18px] font-medium'
												)}
											>
												{item.title}
											</span>
											<div className='text-[#808080] text-sm'>
												{item.productCount} Products{' '}
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						)
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	)
}
