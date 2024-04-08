import { useMutation } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { TypeTimeBlockState } from '@/types/time-block.types'

import { queryClient } from '@/config/query-client'

import { timeBlockService } from '@/services/time-block.service'

export const useCreateTimeBlock = () => {
	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: [TANSTACK_KEYS.createTimeBlock],
		mutationFn: (data: TypeTimeBlockState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.timeBlock] })
	})

	return { createTimeBlock, isPending }
}
