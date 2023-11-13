export interface MarkupConfig {
	version: number
	uid: string
	base_size: { width: number; height: number }
	zone: {
		name: string
		index: number
		type: string
		description: string
		directs: {
			name: string
			index: number
			is_reverse: boolean
			description: string
			lines: {
				name: string
				index: number
				description: string
				lengths: {
					index: number
					from_gate: number
					to_gate: number
					length: number
				}[]
				gates: {
					index: number
					width_line: number
					type: string
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
}
