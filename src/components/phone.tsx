import Image from 'next/image'

type PhoneProps = {
	type: 'header' | 'footer'
}

export default function Phone({ type }: PhoneProps) {
	return (
		<div className='flex items-center'>
			<Image
				src={type === 'header' ? '/phone-yellow.svg' : '/phone-green.svg'}
				className='mr-[10px]'
				width={28}
				height={28}
				alt='phone'
			/>
			<div
				className={`${
					type === 'header' ? 'text-[#6E860B]' : 'text-[#B3DB11]'
				} text-xl`}
			>
				0954633976
			</div>
		</div>
	)
}
