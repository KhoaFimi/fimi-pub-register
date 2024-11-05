import { FC, PropsWithChildren } from 'react'

import Footer from '@/app/(main)/_component/footer'
import Header from '@/app/(main)/_component/header'
import Policies from '@/app/(main)/_component/policies'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='flex w-full items-center justify-center pt-8'>
				<div className='container px-4'>{children}</div>
			</main>
			<Policies />
			<Footer />
		</>
	)
}

export default MainLayout
