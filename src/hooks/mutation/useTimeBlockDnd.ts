import {
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { ITimeBlockResponse } from '@/types/time-block.types'

import { queryClient } from '@/config/query-client'

import { timeBlockService } from '@/services/time-block.service'

export function useTimeBlockDnd(
	items: ITimeBlockResponse[] | undefined,
	setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	)

	const { mutate } = useMutation({
		mutationKey: [TANSTACK_KEYS.timeBlock],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.timeBlock] })
		}
	})

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id && items) {
			const oldIndex = items.findIndex(item => item.id === active.id)
			const newIndex = items.findIndex(item => item.id === (over?.id || ''))

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove(items, oldIndex, newIndex)
				setItems(newItems)
				mutate(newItems.map(item => item.id))
			}
		}
	}

	return { handleDragEnd, sensors }
}
