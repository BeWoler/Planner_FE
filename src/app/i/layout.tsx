import { PropsWithChildren } from 'react'

import { DashboardLayout } from '@/components/layouts/DashboardLayout'

const Layout = ({ children }: PropsWithChildren<unknown>) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
