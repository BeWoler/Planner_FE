import { useQuery } from '@tanstack/react-query'

import { TANSTACK_KEYS } from '@/constants/tan-stack-keys.constants'

import { userService } from '@/services/user.service'

export const useProfile = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [TANSTACK_KEYS.profile],
		queryFn: () => userService.getProfile()
	})

	return { data, isLoading, isSuccess }
}
