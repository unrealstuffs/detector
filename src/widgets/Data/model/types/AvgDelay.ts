import { FetchStatus } from 'shared/types/FetchStatus'

export interface AvgDelay {
	timestamp: string
	direction: string
	line: string
	avgDelay: number
}

export interface AvgDelaySearch {
	directions: string[]
	lines: string[]
	avgDelay: { value: string; statement: string }
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface AvgDelaySchema {
	data: AvgDelay[]
	status: FetchStatus
	tableRows: number
	searchObject: AvgDelaySearch
	blockFetching: boolean
}
