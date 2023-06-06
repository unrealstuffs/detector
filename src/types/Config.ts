export interface Config {
	[key: string]: {
		reverseDirection: boolean
		pl: number[][]
		s: {
			[key: string]: {
				length: number
				pl: number[][]
				s: {
					[key: string]: { pl: number[][] }
				}
			}
		}
	}
}
