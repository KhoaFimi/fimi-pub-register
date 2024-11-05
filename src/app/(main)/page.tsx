import Image from 'next/image'

import RegisterForm from '@/app/(main)/_component/register-form'

const MainPage = () => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center pt-12'>
			<div className='flex h-screen w-fit items-center'>
				<div className='hidden h-full w-[360px] flex-col md:flex'>
					<Image
						src='/quote.svg'
						alt='quote'
						width={360}
						height={224}
					/>
					<Image
						src='/brand.svg'
						alt='brand'
						width={360}
						height={307}
					/>
				</div>
				<div className='h-full w-[420px]'>
					<RegisterForm />
				</div>
			</div>
		</div>
	)
}

export default MainPage
