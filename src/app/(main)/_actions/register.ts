'use server'

import { formatInTimeZone } from 'date-fns-tz'
import { redirect } from 'next/navigation'

import { genCode, genId } from '@/lib/server/gen-id'
import { getSheets } from '@/lib/server/google-sheets'
import { mailer } from '@/lib/server/mailer'
import { newUserMailTemplate } from '@/lib/server/templaces/new-user'
import { registerSchema, RegistrerSchema } from '@/schema/register.schema'

export const register = async (values: RegistrerSchema) => {
	const validatedData = registerSchema.safeParse(values)

	if (validatedData.error)
		return {
			status: 'error',
			message: validatedData.error.message
		}

	const body = validatedData.data

	const sheets = await getSheets()

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range: process.env.SHEET_1
	})

	const {
		data: { values: partners }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range: process.env.SHEET_2
	})

	if (!users)
		return {
			status: 'error',
			message: 'Users not found'
		}
	if (!partners)
		return {
			status: 'error',
			message: 'Partners not found'
		}

	const dulicatedIndex = users.findIndex(user => {
		const duplicatedEmail = user.includes(body.email)
		const duplicatedPhone = user.includes(body.phone)

		return duplicatedEmail || duplicatedPhone
	})

	if (dulicatedIndex !== -1)
		return {
			status: 'error',
			message: 'Người dùng đã tồn tại'
		}

	const invalidPartnerCode = partners.findIndex(
		partner => partner[0] === body.partnerCode
	)

	if (invalidPartnerCode === -1)
		return {
			status: 'error',
			message: 'Mã đối tác không chính xác'
		}

	const id = genId()
	const code = genCode()

	const timestamp = formatInTimeZone(new Date(), 'Asia/Ho_Chi_Minh', 'LLLL d,y')

	const parterSecret = partners[invalidPartnerCode][1]

	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.SHEET_ID,
		range: process.env.SHEET_1,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					timestamp,
					id,
					code,
					body.fullname.toUpperCase(),
					body.gender,
					`'${body.phone}`,
					body.email,
					`'${body.cccd}`,
					body.city,
					body.partnerCode,
					parterSecret,
					'Đang làm việc',
					`["Bằng việc chọn \"Đăng ký ngay\", bạn đã đồng ý với:"]`
				]
			]
		}
	})

	const template = newUserMailTemplate({
		name: body.fullname,
		phone: body.phone,
		date: timestamp,
		code
	})

	const ccMail = String(partners[invalidPartnerCode][3]).split(',')
	const bccMail = String(partners[invalidPartnerCode][4]).split(',')

	const mail = await mailer()

	await mail.sendMail({
		subject: 'FIMI TECH - Thông tin Publisher',
		html: template,
		text: code,
		from: `FIMI ${process.env.ADMIN_EMAIL_ADDRESS}`,
		to: body.email,
		cc: ccMail,
		bcc: bccMail
	})

	const encodeParams = btoa([body.email, code].join(','))

	redirect(`/success?data=${encodeParams}`)
}
