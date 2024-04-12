import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300'],
})

const advantagesCountItems = [
	{
		title: 'Product line',
		count: '37+',
	},
	{
		title: 'Satisfied clients',
		count: '500+',
	},
	{
		title: 'Business partners',
		count: '28',
	},
	{
		title: 'Turnover of goods',
		count: '750k+',
	},
]

const advantagesItems = [
	{
		title: 'Free shipping',
		descr: 'from 100$',
		img: '/delivery-truck-green.svg',
	},
	{
		title: '24/7 support',
		descr: 'Personal consultant',
		img: '/headphones-green.svg',
	},
	{
		title: 'Secure payments',
		descr: 'Secure connection',
		img: '/shopping-bag-green.svg',
	},
	{
		title: 'Careful packaging',
		descr: 'Protective film',
		img: '/package-green.svg',
	},
]

export default function Advantages() {
	return (
		<section>
			<div className="bg-[url('/advantages-bg.png')] py-[130px] bg-no-repeat bg-cover">
				<div className='container flex justify-between'>
					{advantagesCountItems.map((item, index) => {
						return (
							<Card
								key={index}
								className='max-w-[230px] w-full text-center bg-[#ffffff1c] border-[#ffffff1c]'
							>
								<CardHeader>
									<CardTitle
										className={cn(
											poppins.className,
											'text-[#B3DB11] text-[52px]'
										)}
									>
										{item.count}
									</CardTitle>
									<CardDescription className='text-white text-[16px]'>
										{item.title}
									</CardDescription>
								</CardHeader>
							</Card>
						)
					})}
				</div>
			</div>
			<div className='py-[100px] container'>
				<div className='flex justify-between'>
					{advantagesItems.map((item, index) => {
						return (
							<div
								key={index}
								className='max-w-[230px] flex w-full text-center bg-[#ffffff00] border-none'
							>
								<Image src={item.img} alt='d' width={30} height={30} />
								<div className='flex flex-col text-left ml-[10px]'>
									<h3 className={cn(
											poppins.className,
											'text-black text-[16px] mb-[5px]'
										)}>{item.title}</h3>
									<p className='text-gray-400 text-[14px]'>{item.descr}</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}


