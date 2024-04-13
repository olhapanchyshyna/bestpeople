import Image from 'next/image'
import Link from 'next/link'
import Phone from './phone'

export default function Footer() {
	return (
		<footer className="bg-[url('/footer-bg.png')] pt-[50px] pb-[30px] bg-no-repeat bg-cover">
			<div className='container border-t-2 border-slate-400 flex flex-col h-[300px]  justify-between'>
				<div className='mt-[30px] flex justify-between'>
					{/* 1 */}
					<div className='flex flex-col justify-between h-[150px]'>
						<Link href='/'>
							<Image src='logo-white.svg' alt='logo' width={100} height={100} />
						</Link>
						<p className='text-base text-[#E1E1E1]'>
							Smart products for your health
						</p>
						<p className='text-sm text-[#E1E1E1] opacity-65 font-thin'>
							Privacy Policy
						</p>
						<p className='text-sm text-[#E1E1E1] opacity-65 font-light'>
							Public offer
						</p>
					</div>
					{/* 2 */}
					<div className='h-[150px]'>
						<ul className='text-[#E1E1E1] h-full flex flex-col justify-between'>
							<li className='green'>Catalog</li>
							<li>Shop</li>
							<li>My office</li>
							<li>Most selled</li>
						</ul>
					</div>
					{/* 3 */}
					<div className='h-[150px]'>
						<ul className='text-[#E1E1E1] h-full flex flex-col justify-between'>
							<li className='green'>Best&People</li>
							<li>About Company</li>
							<li>Possibilities</li>
							<li>Contacts</li>
						</ul>
					</div>
					{/* 4 */}
					<div className='h-[100px]'>
						<ul className='text-[#E1E1E1] h-full flex flex-col justify-between'>
							<li className='green'>
								{' '}
								<Phone type='footer' width={20} height={20} />{' '}
							</li>
							<li className='flex'>
								<Image
									src='email-green.svg'
									alt='email'
									width={15}
									height={15}
									className='mr-[10px]'
								/>
								example@gmail.com
							</li>
							<li className='flex'>
								<Image
									src='watch-green.svg'
									alt='watch'
									width={15}
									height={15}
									className='mr-[10px]'
								/>
								24/7
							</li>
						</ul>
					</div>
				</div>
				
				<small className='text-[#4f5155] '>
					©Best&People All Rights Reserved.
				</small>
			</div>
		</footer>
	)
}

