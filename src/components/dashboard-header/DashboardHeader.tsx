import { Profile } from '../profile/Profile'
import { GlobalLoader } from '../ui/GlobalLoader'

export const DashboardHeader = () => {
	return (
		<header>
			<GlobalLoader />
			<Profile />
		</header>
	)
}
