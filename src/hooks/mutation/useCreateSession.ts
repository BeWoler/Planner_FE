import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { pomodoroService } from '@/services/pomodoro.service'

export const useCreateSession = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: [TANSTACK_KEYS.createNewSession],
		mutationFn: () => pomodoroService.createSession(),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [TANSTACK_KEYS.getTodaySession]
			})
	})

	return { mutate, isPending }
}
