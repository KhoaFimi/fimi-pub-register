import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import CopyToClipboard from '@/app/(main)/_component/copy-to-clipboard'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

type SearchParams = Promise<{ data: string }>

interface SuccessPageProps {
	searchParams: SearchParams
}

const SuccessPage: FC<SuccessPageProps> = async ({ searchParams }) => {
	const { data } = await searchParams

	const [email, code] = atob(data).split(',')

	return (
		<div className='flex h-screen justify-center'>
			<Card className='h-fit w-[400px] bg-background p-2 shadow-lg'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold uppercase'>
						Chúc mừng
					</CardTitle>
					<CardDescription>Đăng ký mã giới thiệu thành công</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex w-full flex-col items-center space-y-6'>
						<div className='flex w-full flex-col gap-2'>
							<div className='flex w-full flex-col items-center gap-2 rounded-xl bg-gradient-to-tr from-primary from-30% to-secondary px-2 pt-2'>
								<p className='text-center text-xl font-bold uppercase tracking-tight text-white'>
									Mã giới thiệu:
								</p>
								<div className='w-full bg-background px-8 py-4'>
									<p className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold uppercase text-transparent selection:bg-secondary selection:p-2 selection:text-white'>
										{code}
									</p>
								</div>
								<CopyToClipboard text={code} />
							</div>
						</div>

						<div className='space-y-2 rounded-lg border border-dashed border-primary p-2'>
							<p className='text-justify text-sm text-foreground/80'>
								<span>
									<Image
										src='/logo.png'
										alt='logo'
										width={2454}
										height={1066}
										className='inline-flex w-10'
									/>
								</span>{' '}
								sẽ gửi thông tin về mã chiến dịch đến email :{' '}
								<span className='font-semibold italic text-secondary'>
									{email}
								</span>{' '}
								hãy kiểm tra email để nhận mã chiến dịch đã đăng ký
							</p>
							<p className='text-justify text-sm text-foreground/80'>
								Nếu không tìm thấy mail phản hồi, hãy thử tìm trong mục spam
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-8'>
					<div className='flex w-full items-center justify-between'>
						<Button
							className='bg-gradient-to-tr from-primary from-30% to-secondary shadow-md'
							asChild
						>
							<Link href='https://partner.fimi.tech/chien-dich'>
								Lên đơn đầu tiên
							</Link>
						</Button>
						<Button variant='outline'>
							<Link href='https://www.fimi.tech/trang-chu'>Trang chủ</Link>
						</Button>
					</div>
					<p className='select-none text-center text-xs font-bold text-foreground/50'>
						Công Ty TNHH Công Nghệ FIMI
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}

export default SuccessPage
