import { useMutation } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { TypePomodoroRoundState } from '@/types/pomodoro.types'

import { queryClient } from '@/config/query-client'

import { pomodoroService } from '@/services/pomodoro.service'

export const useUpdateRound = () => {
	const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
		mutationKey: [TANSTACK_KEYS.updateRound],
		mutationFn: ({ id, data }: { id: string; data: TypePomodoroRoundState }) =>
			pomodoroService.updateRound(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [TANSTACK_KEYS.getTodaySession]
			})
	})
	return {
		updateRound,
		isUpdateRoundPending
	}
}
