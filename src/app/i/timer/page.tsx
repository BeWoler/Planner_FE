import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pomodoro } from './Pomodoro'

const metadata: Metadata = {
	title: 'Pomodoro Timer',
	...NO_INDEX_PAGE
}

const Page = () => {
	return (
		<div>
			<Heading title='Pomodoro timer' />
			<Pomodoro />
		</div>
	)
}

export default Page
