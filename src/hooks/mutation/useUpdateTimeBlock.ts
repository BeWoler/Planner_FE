import { useMutation } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import type { TypeTimeBlockState } from '@/types/time-block.types'

import { queryClient } from '@/config/query-client'

import { timeBlockService } from '@/services/time-block.service'

export const useUpdateTimeBlock = (key?: string) => {
	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: [TANSTACK_KEYS.updateTimeBlock, key],
		mutationFn: ({ id, data }: { id: string; data: TypeTimeBlockState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [TANSTACK_KEYS.timeBlock] })
	})

	return { updateTimeBlock }
}
