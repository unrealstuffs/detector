import { MarkupConfig } from 'shared/types/MarkupConfig'

interface DirectionsOptions {
	value: string
	label: string
	title: string
}

export const getDirectionsOptions = (config: MarkupConfig) => {
	const options: DirectionsOptions[] = []

	Object.keys(config).forEach((val, index) => {
		options.push({
			value: val,
			title: config[val].reverseDirection
				? `d-${index + 1} (Обратное)`
				: `d-${index + 1} (Прямое)`,
			label: config[val].reverseDirection
				? `d-${index + 1} (Обратное)`
				: `d-${index + 1} (Прямое)`,
		})
	})

	return options
}
