export default interface SearchData {
	licensePlates: string[]
	vehicleTypes: string[]
	directions: string[]
	lines: string[]
	interval: number
	intensity: { value: string; statement: string }
	quantity: { value: string; statement: string }
	avgSpeed: { value: string; statement: string }
	avgDelay: { value: string; statement: string }
	density: { value: string; statement: string }
	timestampRange: {
		from: Date | ''
		to: Date | ''
	}
}
