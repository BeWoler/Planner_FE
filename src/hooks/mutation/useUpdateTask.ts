import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { TypeTaskState } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export const useUpdateTask = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: [TANSTACK_KEYS.updateTask, key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskState }) =>
			taskService.updateTask(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.tasks] })
		}
	})

	return { updateTask }
}
