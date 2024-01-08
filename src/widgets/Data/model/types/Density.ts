import { FetchStatus } from 'shared/types/FetchStatus'

export interface Density {
	timestamp: string
	direction: string
	line: string
	density: string
}

export interface DensitySearch {
	directions: string[]
	lines: string[]
	density: { value: string; statement: string }
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface DensitySchema {
	data: Density[]
	status: FetchStatus
	tableRows: number
	searchObject: DensitySearch
	blockFetching: boolean
}
