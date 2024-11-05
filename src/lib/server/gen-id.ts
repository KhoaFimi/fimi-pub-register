export const genId = (length: number = 12): string => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

export const genCode = (): string => {
	const numbers = Array.from({ length: 5 }, () =>
		Math.floor(Math.random() * 10)
	)

	return `FIMI${numbers.join('')}`
}
