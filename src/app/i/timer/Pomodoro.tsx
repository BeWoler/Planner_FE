'use client'

import { Pause, Play, RefreshCcw } from 'lucide-react'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { useCreateSession } from '@/hooks/mutation/useCreateSession'
import { useDeleteSession } from '@/hooks/mutation/useDeleteSession'
import { useTodaySession } from '@/hooks/query/useTodaySession'
import { useTimer } from '@/hooks/useTimer'
import { useTimerActions } from '@/hooks/useTimerActions'

import { formatTime } from '@/utils/format-time'

import PomodoroRounds from './rounds/PomodoroRounds'

export const Pomodoro = () => {
	const timerState = useTimer()
	const { isLoading, sessionResponse, workInterval } =
		useTodaySession(timerState)
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	)
	const { mutate, isPending } = useCreateSession()
	const rounds = sessionResponse?.data.pomodoroRounds
	const actions = useTimerActions({ ...timerState, rounds: rounds })

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>
					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionResponse.data.id)
						}}
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}
