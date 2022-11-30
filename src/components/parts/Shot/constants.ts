export const modeItems = [
	{
		id: 1,
		title: 'Добавить зону',
		value: 'zone',
	},
	{
		id: 2,
		title: 'Добавить полосу',
		value: 'line',
	},
	{
		id: 3,
		title: 'Добавить счетчик',
		value: 'counter',
	},
]

export interface IDots {
	[key: string]: any
	zone_0: {
		pl: number[][]
		line: {
			pl: number[][]
			direction: {
				pl: number[][]
				counter: {
					pl: number[][]
				}[]
			}[]
		}[]
	}[]
}
