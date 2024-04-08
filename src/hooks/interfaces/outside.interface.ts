import type { Dispatch, SetStateAction } from 'react'

export type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}
