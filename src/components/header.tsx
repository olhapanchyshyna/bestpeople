import Image from 'next/image'
import Link from 'next/link'
import NavigationMenuItems from './navigation-menu-items'
import PageIcons from './page-icons'

export default function Header() {
	return (
		<header className='flex justify-between items-center container h-[75px]'>
			<Link href='/'>
				<Image src='logo-color.svg' alt='logo' width={100} height={100} />
			</Link>

			<NavigationMenuItems />

			<PageIcons />
		</header>
	)
}
