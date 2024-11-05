'use client'

import SecurityPolicy from '@/app/(main)/_component/policies/security-policy'
import TermPolicy from '@/app/(main)/_component/policies/term-policy'
import UserPolicy from '@/app/(main)/_component/policies/user-policy'
import DialogWrapper from '@/components/dialog-wrapper'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store copy'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'

const Policies = () => {
	const { open: openSecurityPolicy, onClose: onCloseSecurityPolicy } =
		useSercurityPolicyStore()
	const { open: openTermPolicy, onClose: onCloseTermPolicy } =
		useTermPolicyStore()
	const { open: openUserPolicy, onClose: onCloseUserPolicy } =
		useUserPolicyStore()

	return (
		<>
			<DialogWrapper
				title='THÔNG BÁO BẢO MẬT'
				open={openSecurityPolicy}
				onOpenChange={onCloseSecurityPolicy}
			>
				<SecurityPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='NỘI DUNG CHÍNH SÁCH VỀ BẢO VỆ DỮ LIỆU CÁ NHÂN CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN ĐỐI VỚI KHÁCH HÀNG'
				open={openUserPolicy}
				onOpenChange={onCloseUserPolicy}
			>
				<UserPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='ĐIỀU KHOẢN SỬ DỤNG'
				open={openTermPolicy}
				onOpenChange={onCloseTermPolicy}
			>
				<TermPolicy />
			</DialogWrapper>
		</>
	)
}

export default Policies
