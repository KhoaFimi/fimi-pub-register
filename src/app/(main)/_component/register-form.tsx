'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { register } from '@/app/(main)/_actions/register'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { cities } from '@/constants/cities'
import { GENDER } from '@/constants/enums'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store copy'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'
import { cn } from '@/lib/utils'
import { registerSchema, RegistrerSchema } from '@/schema/register.schema'

const RegisterForm = () => {
	const form = useForm<RegistrerSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullname: '',
			email: '',
			gender: '',
			cccd: '',
			phone: '',
			tnc: false
		}
	})

	const [error, setError] = useState<string | undefined>(undefined)

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: opOpenUserPolicy } = useUserPolicyStore()

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegistrerSchema) => {
			const res = await register(values)

			return res
		},
		onSuccess: data => {
			if (data.status === 'error') {
				setError(data.message)
			}
		}
	})

	return (
		<div>
			<h4 className='pt-4 text-center text-3xl font-bold uppercase text-primary'>
				Đăng ký mã giới thiệu
			</h4>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-5 px-2 pt-4'
					onSubmit={form.handleSubmit(values => mutate(values))}
				>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary caret-primary focus-visible:outline-none focus-visible:ring-0'
										placeholder='Họ và tên'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex w-full items-start justify-between gap-2'>
						<FormField
							name='gender'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												disabled={isPending}
												className='w-[200px] border border-primary ring-0 focus:ring-0'
											>
												<SelectValue
													placeholder='Giới tính'
													className='placeholder:text-foreground/50'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={GENDER.MALE}>Nam</SelectItem>
											<SelectItem value={GENDER.FEMALE}>Nữ</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='Số điện thoại'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary'
										placeholder='Email'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex w-full items-start justify-between gap-2'>
						<FormField
							name='cccd'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='Căn cước công dân'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormCombobox
							name='city'
							control={form.control}
							form={form}
							initalData='Thành phố'
							items={cities}
							isLoading={isPending}
							isMessage
						/>
					</div>

					<FormField
						name='partnerCode'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary caret-primary focus-visible:outline-none focus-visible:ring-0'
										placeholder='Mã đối tác'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='tnc'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-primary p-3 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel className='text-xs font-semibold text-foreground/50'>
										Bằng việc chọn &#x201C;Đăng ký ngay&#x201D;, bạn đã đồng ý
										với
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<div className='flex w-full flex-col items-start gap-1'>
						<PolicyButton onOpen={onOpenSercutiryPolicy}>
							-Thông báo bảo mật của chúng tôi
						</PolicyButton>
						<PolicyButton onOpen={onOpenTermPolicy}>
							-Chính sách bảo vệ dữ liệu cá nhân
						</PolicyButton>
						<PolicyButton onOpen={opOpenUserPolicy}>
							-Điều khoản sử dụng dịch vụ FIMI
						</PolicyButton>
					</div>

					<div
						className={cn(
							'flex w-full items-center gap-2 rounded-lg border border-destructive bg-destructive/15 p-2 text-sm font-semibold text-destructive',
							{
								['hidden']: !error
							}
						)}
					>
						<ExclamationTriangleIcon className='size-5 text-destructive' />
						<p>{error}</p>
					</div>

					<Button
						type='submit'
						disabled={!form.getFieldState('tnc').isDirty || isPending}
						className='items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary font-bold'
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Đăng ký ngay
					</Button>
				</form>
			</Form>
		</div>
	)
}

const PolicyButton: FC<
	PropsWithChildren<{
		onOpen: () => void
	}>
> = ({ children, onOpen }) => {
	return (
		<button
			onClick={e => {
				e.preventDefault()
				onOpen()
			}}
			className='text-xs font-semibold italic text-primary hover:underline'
		>
			{children}
		</button>
	)
}

export default RegisterForm
