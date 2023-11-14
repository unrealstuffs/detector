import { MarkupConfig } from 'features/SendMarkupConfig/model/types/markupConfig'

interface DirectionsOptions {
	value: string
	label: string
	title: string
}

export const getDirectionsOptions = (config: MarkupConfig) => {
	const options: DirectionsOptions[] = []

	config.zone.directs.forEach(dir => {
		options.push({
			value: dir.index.toString(),
			title: dir.name,
			label: dir.name,
		})
	})

	return options
}
