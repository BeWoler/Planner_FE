import cn from 'clsx'
import { X } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { Badge } from '../Badge'

export interface IOption {
	label: string
	value: string
}

export interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

const SingleSelect = ({ ...props }: ISingleSelect) => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () =>
		props.data.find(item => item.value === props.value)?.value

	return (
		<div
			className={cn('relative min-w-36', {
				'w-max': props.isColorSelect
			})}
			ref={ref}
		>
			<button
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
				}}
			>
				{getValue() ? (
					<Badge
						variant={props.value}
						className='capitalize'
						style={props.isColorSelect ? { backgroundColor: props.value } : {}}
					>
						{props.value}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{props.value && (
				<button
					className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity'
					onClick={e => {
						e.preventDefault()
						props.onChange('')
					}}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn(
						'absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg'
					)}
					style={{ top: 'calc(100% + .5rem)' }}
				>
					{props.data.map(item => (
						<button
							key={item.value}
							onClick={e => {
								e.preventDefault()
								props.onChange(item.value)
								setIsShow(false)
							}}
							className='block mb-4 last:mb-0 capitalize rounded-lg'
							style={props.isColorSelect ? { backgroundColor: item.value } : {}}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default SingleSelect
