export interface Type {
	timestamp: string
	licensePlate: string
	type: string
	direction: string
	line: string
}

export interface Intensity {
	timestamp: string
	direction: string
	intensity: number
}

export interface Composition {
	timestamp: string
	direction: string
	vehicleType: string
	quantity: number
}

export interface Speed {
	timestamp: string
	direction: string
	avgSpeed: number
}

export interface Delay {
	timestamp: string
	direction: string
	avgDelay: number
}

export interface Density {
	timestamp: string
	density: string
	direction: string
	line: string
}

export interface DataState {
	types?: Type[]
	intensity?: Intensity[]
	composition?: Composition[]
	speed?: Speed[]
	delay?: Delay[]
	density?: Density[]
}

export type TableNameType =
	| 'types'
	| 'intensity'
	| 'composition'
	| 'speed'
	| 'delay'
	| 'density'
