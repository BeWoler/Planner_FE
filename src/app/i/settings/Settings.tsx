'use client'

import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useUpdateSettings } from '@/hooks/mutation/useUpdateSettings'
import { useInitialData } from '@/hooks/query/useInitialData'

const Settings: NextPage = () => {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { mutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							label='Email'
							placeholder='Enter email: '
							type='email'
							extra='mb-4'
							{...register('email', { required: 'Email is required!' })}
						/>
						<Field
							id='name'
							label='Name'
							placeholder='Enter name: '
							extra='mb-4'
							{...register('name')}
						/>
						<Field
							id='password'
							label='Password'
							placeholder='Enter password: '
							type='password'
							extra='mb-10'
							{...register('password')}
						/>
					</div>
					<div>
						<Field
							id='workInterval'
							label='Work interval (min.): '
							placeholder='Enter work interval (min.)'
							isNumber
							extra='mb-4'
							{...register('workInterval', { valueAsNumber: true })}
						/>
						<Field
							id='breakInterval'
							label='Break interval (min.): '
							placeholder='Enter break interval (min.)'
							isNumber
							extra='mb-4'
							{...register('breakInterval', { valueAsNumber: true })}
						/>
						<Field
							id='intervalsCount'
							label='Intervals count (max 10): '
							placeholder='Enter intervals count (max 10)'
							isNumber
							extra='mb-6'
							{...register('intervalsCount', { valueAsNumber: true })}
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}

export default Settings
