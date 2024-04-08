import { BASE_URL } from '@/constants/base-url.constants'

import type {
	IPomodoroSessionResponse,
	TypePomodoroRoundState,
	TypePomodoroSessionState
} from '@/types/pomodoro.types'

import { axiosWithAuth } from '@/api/interceptors'

class PomodoroService {
	private BASE_URL = BASE_URL.pomodoroService

	async getTodaySession() {
		return await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		)
	}

	async createSession() {
		return await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL)
	}

	async updateSession(id: string, data: TypePomodoroSessionState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteSession(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}

	async updateRound(id: string, data: TypePomodoroRoundState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data)
	}
}

export const pomodoroService = new PomodoroService()
