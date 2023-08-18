import { MarkupConfig } from 'shared/types/MarkupConfig'

export const getLineOptions = (config: MarkupConfig) => {
	const options = [{ title: 'Все полосы', value: '' }]

	Object.keys(config).forEach((z, zIndex) => {
		Object.keys(config[z].s).forEach((l, lIndex) => {
			options.push({
				value: l,
				title: `d-${zIndex + 1} l-${lIndex + 1}`,
			})
		})
	})

	return options
}
