import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { taskService } from '@/services/task.service'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: [TANSTACK_KEYS.deleteTask],
		mutationFn: ({ id }: { id: string }) => taskService.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.tasks] })
		}
	})

	return { deleteTask }
}
