import Advantages from '@/components/advantages'
import Benefits from '@/components/benefits'
import CategorySlider from '@/components/category-slider'
import Image from 'next/image'
import React from 'react'


export default function page() {
	return (
		<main>
			<section>
				<Image
					src='/bg-with-arms.png'
					alt='bg-with-arms'
					width={1880}
					height={750}
					className='xl:w-[100vw] xl:h-[80vh] m-auto bg-no-repeat'
				/>
			</section>
			<CategorySlider/>
			<Advantages/>
			<Benefits/>
		</main>
	)
}
