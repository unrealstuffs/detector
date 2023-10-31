export interface MarkupConfig {
	directs: {
		name: string
		index: number
		is_reverse: boolean
		lines: {
			name: string
			index: number
			length: number
			gates: {
				index: number
				gate: {
					index: number
					point: {
						x: number
						y: number
					}
				}[]
			}[]
		}[]
	}[]
}
