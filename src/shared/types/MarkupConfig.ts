export interface MarkupConfig {
	[key: string]: {
		pl: number[][]
		cpl: number[][]
		length: number
		d: {
			id: string
			reverseDirection: boolean
		}
		s: {
			[key: string]: {
				pl: number[][]
			}
		}
	}
}
