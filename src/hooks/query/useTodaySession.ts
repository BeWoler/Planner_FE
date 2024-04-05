import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { ITimerState } from '@/types/timer.types'

import { useLoadSettings } from '../useLoadSettings'

import { pomodoroService } from '@/services/pomodoro.service'

export const useTodaySession = ({
	setActiveRound,
	setSecondsLeft
}: ITimerState) => {
	const { workInterval } = useLoadSettings()
	const {
		data: sessionResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: [TANSTACK_KEYS.getTodaySession],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessionResponse?.data.pomodoroRounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessionResponse, isLoading, refetch, isSuccess, workInterval }
}
