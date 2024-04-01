'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { AUTH_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const LogoutButton = () => {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: [TANSTACK_KEYS.logout],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push(AUTH_PAGES.AUTH)
	})
	return (
		<div className='absolute top-1 right-1'>
			<button
				className='opacity-20 hover:opacity-100 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<LogOut size={20} />
			</button>
		</div>
	)
}
