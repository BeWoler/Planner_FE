'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TypeTimeBlockState } from '@/types/time-block.types'

import { TimeBlockingList } from './TimeBlockingList'
import TimeBlockingForm from './form/TimeBlockingForm'

const TimeBlocking = () => {
	const methods = useForm<TypeTimeBlockState>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}

export default TimeBlocking
