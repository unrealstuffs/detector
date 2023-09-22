import { FetchStatus } from 'shared/types/FetchStatus'

export interface Composition {
	timestamp: string
	direction: string
	line: string
	vehicleType: string
	quantity: number
}

export interface CompositionSearch {
	vehicleTypes: string[]
	directions: string[]
	lines: string[]
	interval: number
	quantity: { value: string; statement: string }
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface CompositionSchema {
	data: Composition[]
	status: FetchStatus
	tableRows: number
	searchObject: CompositionSearch
	blockFetching: boolean
}
