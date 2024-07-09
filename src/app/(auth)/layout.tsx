import React, { ReactNode } from 'react'

export default function Layout({children}: {children: ReactNode}) {
	return (
		<section className='container w-[350px] h-[500px] px-[20px] sm:w-[500px] my-[60px] sm:my-[90px]'>
			{children}
		</section>
	)
}
