import { Metadata, NextPage } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

const Page: NextPage = ({}) => {
	return <div>Dashboard</div>
}

export default Page
