export interface MarkupConfig {
	[key: string]: ZonesPoints
}

export interface ZonesPoints {
	reverseDirection: boolean
	pl: number[][]
	s: { [key: string]: LinePoints }
}

export interface LinePoints {
	length: number
	pl: number[][]
	s: { [key: string]: CounterPoints }
}

export interface CounterPoints {
	pl: number[][]
}
