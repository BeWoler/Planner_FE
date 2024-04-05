import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { timeBlockService } from '@/services/time-block.service'

export function useDeleteTimeBlock(itemId: string) {
	const queryClient = useQueryClient()

	const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation({
		mutationKey: [TANSTACK_KEYS.deleteTimeBlock, itemId],
		mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [TANSTACK_KEYS.timeBlock]
			})
		}
	})

	return { deleteTimeBlock, isDeletePending }
}
