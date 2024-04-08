import type { UseFormWatch } from 'react-hook-form'

import type { TypeTaskState } from '@/types/task.types'

export interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskState>
	itemId: string
}
