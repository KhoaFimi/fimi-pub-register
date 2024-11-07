import '@/app/globals.css'

import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/query.provider'

import ogImage from '../../public/og.jpg'

export const metadata: Metadata = {
	title: 'FIMI - Register',
	description: 'Công Ty TNHH Công Nghệ FIMI - Giải Pháp Bán Hàng Đa Kênh',
	openGraph: {
		title: 'Đăng ký mã giới thiệu',
		description: 'FIMI - Giải pháp bán hàng đa kênh',
		url: 'https://fimi-register.vercel.app',
		siteName: 'FIMI',
		images: [
			{
				url: ogImage.src,
				width: ogImage.width,
				height: ogImage.height
			}
		]
	}
}

const font = Montserrat({
	subsets: ['vietnamese', 'latin']
})

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={cn('antialiased', font.className)}>
				<QueryProvider>{children}</QueryProvider>
				<Toaster />
				<Analytics />
			</body>
		</html>
	)
}

export default RootLayout
