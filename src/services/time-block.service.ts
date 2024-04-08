import { BASE_URL } from '@/constants/base-url.constants'

import {
	ITimeBlockResponse,
	TypeTimeBlockState
} from '@/types/time-block.types'

import { axiosWithAuth } from '@/api/interceptors'

class TimeBlockService {
	private BASE_URL = BASE_URL.timeBlockService

	async getTimeBlocks() {
		return await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL)
	}

	async createTimeBlock(data: TypeTimeBlockState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateOrderTimeBlock(ids: string[]) {
		return await axiosWithAuth.put(`${this.BASE_URL}/update-order`, {
			ids
		})
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/update/${id}`, data)
	}

	async deleteTimeBlock(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const timeBlockService = new TimeBlockService()
