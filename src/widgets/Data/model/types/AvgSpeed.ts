import { FetchStatus } from 'shared/types/FetchStatus'

export interface AvgSpeed {
	timestamp: string
	direction: string
	line: string
	avgSpeed: number
}

export interface AvgSpeedSearch {
	directions: string[]
	lines: string[]
	avgSpeed: { value: string; statement: string }
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface AvgSpeedSchema {
	data: AvgSpeed[]
	status: FetchStatus
	tableRows: number
	searchObject: AvgSpeedSearch
}
