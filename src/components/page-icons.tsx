import Image from 'next/image'
import Link from 'next/link'
import Phone from './phone'

export default function PageIcons() {
	return (
		<div className='flex justify-between w-64'>
			<Phone type='header'/>
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
