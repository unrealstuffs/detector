import { FetchStatus } from 'shared/types/FetchStatus'

export interface Type {
	timestamp: string
	licensePlate: string
	type: string
	direction: string
	line: string
}

export interface TypesSearch {
	licensePlates: string[]
	vehicleTypes: string[]
	directions: string[]
	lines: string[]
	timestampRange: {
		from: string | Date
		to: string | Date
	}
}

export interface TypesSchema {
	data: Type[]
	status: FetchStatus
	tableRows: number
	searchObject: TypesSearch
	blockFetching: boolean
}
