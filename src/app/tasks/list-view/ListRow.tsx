import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox/Checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import SingleSelect from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import { PRIORITY } from '@/constants/priority.constants'

import type { ITaskResponse, TypeTaskState } from '@/types/task.types'

import { useDeleteTask } from '@/hooks/mutation/useDeleteTask'
import { useTaskDebounce } from '@/hooks/useTaskDebounce'

export interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
}

const ListRow = ({ item, setItems }: IListRow) => {
	const { deleteTask, isDeletePending } = useDeleteTask()
	const { register, control, watch } = useForm<TypeTaskState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	return (
		<div
			className={cn(
				// styles.row,
				// watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className='' />
					</button>
					<Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)}
					/>
					<TransparentField {...register('name')} />
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={PRIORITY.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div>
				<button
					onClick={() => {
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, 1))
					}}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}

export default ListRow
