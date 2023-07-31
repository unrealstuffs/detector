interface Type {
	timestamp: string
	licensePlate: string
	type: string
	direction: string
	line: string
}

interface Intensity {
	timestamp: string
	direction: string
	intensity: number
}

interface Composition {
	timestamp: string
	direction: string
	vehicleType: string
	quantity: number
}

interface Speed {
	timestamp: string
	direction: string
	avgSpeed: number
}

interface Delay {
	timestamp: string
	direction: string
	avgDelay: number
}

interface Density {
	timestamp: string
	density: string
	direction: string
	line: string
}

export interface DataState {
	types: Type[]
	intensity: Intensity[]
	composition: Composition[]
	speed: Speed[]
	delay: Delay[]
	density: Density[]
}
