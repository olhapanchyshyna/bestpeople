import Header from '@/components/header'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Footer from '@/components/footer'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
	title: 'Best & People',
	description: 'Smart products for your health',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={cn(roboto.className, 'm-auto')}>
				{/* <Header /> */}
				<main>{children}</main>
				{/* <Footer /> */}
			</body>
		</html>
	)
}
