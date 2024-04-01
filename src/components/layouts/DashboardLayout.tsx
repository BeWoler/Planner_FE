import { PropsWithChildren } from 'react'

import { DashboardHeader } from '../dashboard-header/DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar />
			<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
				<DashboardHeader />
				{children}
			</main>
		</div>
	)
}
