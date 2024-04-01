import { BASE_URL } from '@/constants/base-url.constants'

import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: string
	}[]
}

class UserService {
	private BASE_URL = BASE_URL.userService

	async getProfile() {
		return (await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)).data
	}

	async update(data: TypeUserForm) {
		return (await axiosWithAuth.put(this.BASE_URL, data)).data
	}
}

export const userService = new UserService()
