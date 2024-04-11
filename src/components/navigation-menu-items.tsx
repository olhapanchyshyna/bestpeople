'use client'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function NavigationMenuItems() {
	return (
		<NavigationMenu className='flex justify-between'>
			<NavigationMenuList className='w-[350px] text-base flex !justify-between'>
				{/* 2 */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className='text-base font-normal px-0'>
						Catalog
					</NavigationMenuTrigger>
					<NavigationMenuContent className='flex flex-col py-[20px] !w-[200px] text-center'>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Detox
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Anti-aging
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Weight normalization
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Healthy heart
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Relax
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Immunity
						</NavigationMenuLink>
						<NavigationMenuLink className='my-[5px]' href='/catalog'>
							Beauty
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* 3 */}
				<NavigationMenuItem>
					<NavigationMenuLink href='/about-company'>
						About company
					</NavigationMenuLink>
				</NavigationMenuItem>
				{/* 4 */}
				<NavigationMenuItem>
					<NavigationMenuLink href='/contacts'>Contacts</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
