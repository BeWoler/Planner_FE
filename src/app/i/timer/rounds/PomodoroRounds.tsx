import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import styles from './PomodoroRounds.module.scss'

export interface IPomodoroRounds {
	rounds: IPomodoroRoundResponse[] | undefined
	activeRound: IPomodoroRoundResponse | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
}

const PomodoroRounds = ({ ...props }: IPomodoroRounds) => {
	const isCanPreRound = props.rounds
		? props.rounds.some(round => round.isCompleted)
		: false
	const isCanNextRound = props.rounds
		? !props.rounds[props.rounds.length - 1].isCompleted
		: false

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPreRound}
				onClick={() => (isCanPreRound ? props.prevRoundHandler() : false)}
			>
				<ChevronLeft size={23} />
			</button>
			<div className={styles.roundsContainer}>
				{props.rounds &&
					props.rounds.map((round, i) => (
						<div
							key={i}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]:
									round.id === props.activeRound?.id && !round.isCompleted
							})}
						/>
					))}
			</div>
			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? props.nextRoundHandler() : false)}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}

export default PomodoroRounds
