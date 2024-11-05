import { z } from 'zod'

export const registerSchema = z.object({
	fullname: z
		.string({ required_error: 'Vui lòng nhập họ và tên' })
		.min(1, { message: 'Vui lòng nhập họ và tên' }),
	gender: z
		.string({ required_error: 'Vui lòng chọn giới tính' })
		.min(1, { message: 'Vui lòng chọn giới tính' }),
	phone: z
		.string({ required_error: 'Vui lòng nhập số điện thoại' })
		.min(10, { message: 'Số điện thoại phải có 10 số' })
		.max(10, { message: 'Số điện thoại chỉ có 10 số' })
		.regex(/^\d+$/, {
			message: 'Số điện thoại chỉ bao gồm số'
		}),
	email: z
		.string({
			required_error: 'Vui lòng nhập email'
		})
		.email({
			message: 'Email không đúng định dạng'
		}),
	cccd: z
		.string({
			required_error: 'Vui lòng nhập cccd'
		})
		.min(12, { message: 'CCCD phải có 12 số' })
		.max(12, { message: 'CCCD chỉ có 12 số' }),
	city: z.string({ required_error: 'Vui lòng chọn khu vực làm việc' }),
	partnerCode: z.string({
		required_error: 'Vui lòng nhập mã đối tác'
	}),
	tnc: z.boolean().default(false)
})

export type RegistrerSchema = z.infer<typeof registerSchema>
