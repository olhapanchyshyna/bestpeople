import Image from 'next/image'
import Link from 'next/link'
import Phone from './phone'
import { getServerSideArrayCookie } from '@/lib/cookies/server/get-server-side-array-cookie'

export default async function PageIcons() {
	const cookieGoodsArrays = await getServerSideArrayCookie("basket");

	const totalQuantity = cookieGoodsArrays?.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);

	return (
		<div className='flex justify-between md:w-64 order-3 md:order-none'>
			<Phone type='header' width={28} height={28} className='hidden md:flex'/>
			<div className='flex items-center justify-between w-16'>
				<Link href='/login'>
					<Image src='/profile.svg' alt='profile' width={30} height={30} />
				</Link>
				<Link href='/basket' className='relative'>
					<Image src='/basket.svg' alt='basket' width={17} height={25} />
					<div className='absolute text-[8px] bg-[#fca600] top-[-8px] right-[-8px] rounded-full px-[3px] py-[1px] text-white'>{totalQuantity}</div>
				</Link>
			</div>
		</div>
	)
}
