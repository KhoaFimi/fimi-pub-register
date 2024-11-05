import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const links = [
	{
		id: 1,
		name: 'Campaign',
		label: 'Chiến dịch',
		href: 'https://partner.fimi.tech/chien-dich'
	},
	{
		id: 2,
		name: 'Report',
		label: 'Báo cáo',
		href: 'https://partner.fimi.tech/bao-cao-publisher'
	}
]

const Header = () => {
	return (
		<header className='sticky inset-x-0 top-0 flex w-full items-center justify-center bg-gradient-to-r from-primary to-secondary shadow-md'>
			<div className='container flex items-center justify-between gap-4 px-2 py-2 md:px-28'>
				<Link
					href='https://partner.fimi.tech/chien-dich'
					target='_blank'
				>
					<Image
						src='/logo-negative.png'
						width={3148}
						height={1367}
						alt='logo'
						className='w-28'
					/>
				</Link>
				<nav className='flex items-center'>
					{links.map(link => (
						<Button
							asChild
							variant='link'
							key={link.id}
							className='text-lg font-bold text-white'
						>
							<Link href={link.href}>{link.label}</Link>
						</Button>
					))}
				</nav>
			</div>
		</header>
	)
}

export default Header
