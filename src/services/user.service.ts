import { BASE_URL } from '@/constants/base-url.constants'

import type { TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

import type { IProfileResponse } from './interfaces/user.interface'

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
