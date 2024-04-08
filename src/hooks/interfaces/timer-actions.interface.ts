import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import type { ITimerState } from '@/types/timer.types'

export type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined
}
