'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TypeTimeBlockState } from '@/types/time-block.types'

import TimeBlockingForm from './form/TimeBlockingForm'

const TimeBlocking = () => {
	const methods = useForm<TypeTimeBlockState>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}

export default TimeBlocking
