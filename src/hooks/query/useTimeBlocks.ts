import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { ITimeBlockResponse } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: [TANSTACK_KEYS.timeBlock],
		queryFn: () => timeBlockService.getTimeBlocks()
	})

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, isLoading }
}
