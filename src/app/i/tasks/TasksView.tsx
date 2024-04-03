'use client'

import Loader from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import SwitchView from './SwitchView'
import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'

export type TypeView = 'list' | 'kanban'

const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'tasks-view',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitchView
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}

export default TasksView
