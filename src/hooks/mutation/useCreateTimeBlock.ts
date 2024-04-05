import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { TypeTimeBlockState } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

export const useCreateTimeBlock = () => {
	const queryClient = useQueryClient()

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: [TANSTACK_KEYS.createTimeBlock],
		mutationFn: (data: TypeTimeBlockState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.timeBlock] })
	})

	return { createTimeBlock, isPending }
}
