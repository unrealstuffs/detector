import { FetchStatus } from 'shared/types/FetchStatus'

export interface Intensity {
	timestamp: string
	direction: string
	line: string
	intensity: number
}

export interface IntensitySearch {
	directions: string[]
	lines: string[]
	intensity: { value: string; statement: string }
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface IntensitySchema {
	data: Intensity[]
	status: FetchStatus
	tableRows: number
	searchObject: IntensitySearch
}
