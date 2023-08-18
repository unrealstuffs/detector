import { MarkupConfig } from 'shared/types/MarkupConfig'

export const getDirectionsOptions = (config: MarkupConfig) => {
	const options = [{ title: 'Все направления', value: '' }]

	Object.keys(config).forEach((val, index) => {
		options.push({
			value: val,
			title: config[val].reverseDirection
				? `d-${index + 1} (Обратное)`
				: `d-${index + 1} (Прямое)`,
		})
	})

	return options
}
