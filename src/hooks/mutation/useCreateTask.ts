import { useMutation } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { TypeTaskState } from '@/types/task.types'

import { queryClient } from '@/config/query-client'

import { taskService } from '@/services/task.service'

export const useCreateTask = () => {
	const { mutate: createTask } = useMutation({
		mutationKey: [TANSTACK_KEYS.createTask],
		mutationFn: (data: TypeTaskState) => taskService.createTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.tasks] })
		}
	})

	return { createTask }
}
