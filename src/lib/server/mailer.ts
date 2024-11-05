import { google } from 'googleapis'
import * as nodemailer from 'nodemailer'

export const mailer = async () => {
	const Oauth2 = google.auth.OAuth2

	const oauth2Client = new Oauth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET
	)

	oauth2Client.setCredentials({
		refresh_token: process.env.GOOGLE_REFRESH_TOKEN
	})

	const accessTokenObj = await oauth2Client.getAccessToken()

	const token = accessTokenObj.token

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.ADMIN_EMAIL_ADDRESS,
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
			accessToken: token
		}
	} as nodemailer.TransportOptions)

	return transport
}
