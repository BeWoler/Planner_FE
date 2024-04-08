import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'

import type { TypeTaskState } from '@/types/task.types'

import type { IUseTaskDebounce } from './interfaces/task-debounce.interface'
import { useCreateTask } from './mutation/useCreateTask'
import { useUpdateTask } from './mutation/useUpdateTask'

export const useTaskDebounce = ({ watch, itemId }: IUseTaskDebounce) => {
	const { updateTask } = useUpdateTask()
	const { createTask } = useCreateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskState) => {
			createTask(formData)
		}, 666),
		[]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskState) => {
			updateTask({ id: itemId, data: formData })
		}, 666),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})
		return () => {
			unsubscribe()
		}
	}, [watch(), debounceUpdateTask, debounceCreateTask])
}
