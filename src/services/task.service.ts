import { BASE_URL } from '@/constants/base-url.constants'

import { ITaskResponse, TypeTaskState } from '@/types/task.types'

import { axiosWithAuth } from '@/api/interceptors'

class TaskService {
	private BASE_URL = BASE_URL.taskService

	async getTasks() {
		return await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
	}

	async createTask(data: TypeTaskState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateTask(id: string, data: TypeTaskState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteTask(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const taskService = new TaskService()
