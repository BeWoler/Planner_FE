import { Metadata, NextPage } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Statistics } from './Statistics'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

const DashBoardPage: NextPage = ({}) => {
	return (
		<div>
			<Heading title='Statistics' />
			<Statistics />
		</div>
	)
}

export default DashBoardPage
