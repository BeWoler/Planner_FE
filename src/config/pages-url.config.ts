class DASHBOARD {
	private root = '/i'

	HOME = this.root
	TASKS = `${this.root}/tasks`
	HABITS = `${this.root}/habits`
	TIMER = `${this.root}/timer`
	TIME_BLOCKING = `${this.root}/time-blocking`
	SETTINGS = `${this.root}/settings`
}

class AUTH {
	private root = '/auth'

	AUTH = this.root
}

export const DASHBOARD_PAGES = new DASHBOARD()
export const AUTH_PAGES = new AUTH()
