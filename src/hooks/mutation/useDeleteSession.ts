import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { pomodoroService } from '@/services/pomodoro.service'

export const useDeleteSession = (onDeleteSuccess: () => void) => {
	const queryClient = useQueryClient()

	const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
		mutationKey: [TANSTACK_KEYS.deleteSession],
		mutationFn: (id: string) => pomodoroService.deleteSession(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TANSTACK_KEYS.getTodaySession]
			})
			onDeleteSuccess()
		}
	})

	return { deleteSession, isDeletePending }
}
