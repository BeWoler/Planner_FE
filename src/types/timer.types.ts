import type { Dispatch, SetStateAction } from 'react'

import { IPomodoroRoundResponse } from './pomodoro.types'

export interface ITimerState {
	secondsLeft: number
	isRunning: boolean
	activeRound: IPomodoroRoundResponse | undefined
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
}
