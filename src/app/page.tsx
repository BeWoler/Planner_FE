'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
	const { push } = useRouter()

	useEffect(() => {
		push('/i')
	}, [])

	return <div></div>
}

export default Page
