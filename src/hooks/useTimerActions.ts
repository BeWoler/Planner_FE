import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import type { ITimerState } from '@/types/timer.types'

import { useUpdateRound } from './mutation/useUpdateRound'
import { useLoadSettings } from './useLoadSettings'

type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined
}

export const useTimerActions = ({
	activeRound,
	setActiveRound,
	setIsRunning,
	secondsLeft,
	rounds
}: TypeUseTimerActions) => {
	const { workInterval } = useLoadSettings()
	const { updateRound, isUpdateRoundPending } = useUpdateRound()

	const pauseHandler = () => {
		const totalSeconds = workInterval * 60 - secondsLeft

		setIsRunning(false)

		if (activeRound?.id)
			return updateRound({
				id: activeRound?.id,
				data: {
					totalSeconds: secondsLeft,
					isCompleted: Math.floor(totalSeconds / 60) >= workInterval
				}
			})
	}

	const playHandler = () => {
		setIsRunning(true)
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
	}

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		})

		setActiveRound(lastCompletedRound)
	}

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler
	}
}
