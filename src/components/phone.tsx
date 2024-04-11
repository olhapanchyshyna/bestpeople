import Image from 'next/image'

type PhoneProps = {
	type: 'header' | 'footer'
	width: number
	height: number
}

export default function Phone({ type, width, height }: PhoneProps) {
	return (
		<div className='flex items-center'>
			<Image
				src={type === 'header' ? '/phone-yellow.svg' : '/phone-green.svg'}
				className='mr-[10px]'
				width={width}
				height={height}
				alt='phone'
			/>
			<div
				className={`${
					type === 'header' ? 'text-[#6E860B]' : 'text-[#B3DB11]'
				} text-xl`}
			>
				095 463 39 76
			</div>
		</div>
	)
}
