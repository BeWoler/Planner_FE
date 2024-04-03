'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { useAuth } from '@/hooks/mutation/useAuth'

const Auth = ({}) => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { mutate } = useAuth(isLoginForm, reset)

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Auth' />
				<Field
					{...register('email', {
						required: 'Email is required!'
					})}
					id='email'
					label='Email:'
					placeholder='Enter email: '
					type='email'
					extra='mb-4'
				/>
				<Field
					{...register('password', {
						required: 'Password is required!'
					})}
					id='password'
					label='Password:'
					placeholder='Enter password: '
					type='password'
					extra='mb-6'
				/>
				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}

export default Auth
