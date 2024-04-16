import Image from 'next/image'
import Link from 'next/link'
import Phone from './phone'

export default function PageIcons() {
	return (
		<div className='flex justify-between md:w-64 order-3 md:order-none'>
			<Phone type='header' width={28} height={28} className='hidden md:flex'/>
			<div className='flex items-center justify-between w-16'>
				<Link href='/login'>
					<Image src='profile.svg' alt='profile' width={30} height={30} />
				</Link>
				<Link href='/basket'>
					<Image src='basket.svg' alt='basket' width={17} height={25} />
				</Link>
			</div>
		</div>
	)
}
