import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { ITaskResponse } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export const useTasks = () => {
	const { data } = useQuery({
		queryKey: [TANSTACK_KEYS.tasks],
		queryFn: () => taskService.getTasks()
	})

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}
