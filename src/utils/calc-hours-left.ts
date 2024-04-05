import type { ITimeBlockResponse } from '@/types/time-block.types'

export const calcHoursLeft = (items: ITimeBlockResponse[] | undefined) => {
	const totalMinutes = items?.reduce((acc, item) => acc + item.duration, 0) || 0
	const totalHours = Math.floor(totalMinutes / 60)
	const hoursLeft = 24 - totalHours

	return { hoursLeft }
}
