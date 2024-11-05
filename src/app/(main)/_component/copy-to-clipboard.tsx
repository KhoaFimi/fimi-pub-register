'use client'

import { ClipboardCopy } from 'lucide-react'
import { FC } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'

interface CopyToClipboardProps {
	text: string
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text }) => {
	const [_copiedText, copy] = useCopyToClipboard()

	const handleCopy = (text: string) => {
		copy(text).then(() => {
			console.log('has copied')
			toast(`Đã sao chép mã giới thiệu "${text}"`)
		})
	}

	return (
		<button
			onClick={() => handleCopy(text)}
			className='border-non flex items-center gap-2 bg-transparent px-4 py-2 font-semibold text-white'
		>
			<ClipboardCopy className='size-5' /> <p>Sao chép mã giới thiệu</p>
		</button>
	)
}

export default CopyToClipboard
