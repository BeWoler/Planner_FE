import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { Dispatch, SetStateAction } from 'react'
import { useId } from 'react'

import { FILTERS } from '@/constants/filters.constants'

import type { ITaskResponse } from '@/types/task.types'

import { filterTasks } from '@/utils/filter-tasks'

import { KanbanAddCardInput } from './KanbanAddCardInput'
import { KanbanCard } from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanColumn = ({
	value,
	items,
	label,
	setItems
}: IKanbanColumn) => {
	const customId = useId()

	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>
						{filterTasks(items, value)?.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id || customId}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<KanbanCard
											key={item.id}
											item={item}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						{value !== 'completed' && !items?.some(item => !item.id) && (
							<KanbanAddCardInput
								setItems={setItems}
								filterDate={
									FILTERS[value] ? FILTERS[value].format() : undefined
								}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	)
}
