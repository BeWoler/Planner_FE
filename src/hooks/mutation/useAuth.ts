import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const useAuth = (
	isLoginForm: boolean,
	reset: UseFormReset<IAuthForm>
) => {
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: [TANSTACK_KEYS.auth],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess: () => {
			toast.success('Successfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError: (error: any) => {
			toast.error(error.response?.data.message)
			reset()
		}
	})

	return { mutate }
}
