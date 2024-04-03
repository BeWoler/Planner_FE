import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { TypeUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export const useUpdateSettings = () => {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: [TANSTACK_KEYS.updateSettings],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess: () => {
			toast.success('Successfully updated profile!')
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.profile] })
		}
	})

	return { mutate, isPending }
}
