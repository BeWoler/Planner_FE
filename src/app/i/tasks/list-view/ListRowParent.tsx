import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { Dispatch, SetStateAction } from 'react'

import { FILTERS } from '@/constants/filters.constants'

import { ITaskResponse } from '@/types/task.types'

import { filterTasks } from '@/utils/filter-tasks'

import { ListAddRowInput } from './ListAddRowInput'
import ListRow from './ListRow'
import styles from './ListView.module.scss'

export interface IListRowParend {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListRowParent = ({ ...props }: IListRowParend) => {
	return (
		<Droppable droppableId={props.value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{props.label}</div>
					</div>
					{filterTasks(props.items, props.value)?.map((item, i) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={i}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<ListRow
										key={item.id}
										item={item}
										setItems={props.setItems}
									/>
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
					{props.value !== 'completed' &&
						!props.items?.some(item => !item.id) && (
							<ListAddRowInput
								setItems={props.setItems}
								filterDate={
									FILTERS[props.value]
										? FILTERS[props.value].format()
										: undefined
								}
							/>
						)}
				</div>
			)}
		</Droppable>
	)
}

export default ListRowParent
