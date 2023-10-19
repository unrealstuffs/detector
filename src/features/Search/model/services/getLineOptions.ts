import { MarkupConfig } from 'shared/types/MarkupConfig'
interface LineOptions {
	value: string
	label: string
	title: string
}

export const getLineOptions = (config: MarkupConfig) => {
	const options: LineOptions[] = []

	Object.keys(config).forEach((z, zIndex) => {
		Object.keys(config[z].s).forEach((l, lIndex) => {
			options.push({
				value: l,
				title: `d-${zIndex + 1} l-${lIndex + 1}`,
				label: `l-${lIndex + 1}`,
			})
		})
	})

	return options.filter((obj, index) => {
		return index === options.findIndex(o => obj.value === o.value)
	})
}
