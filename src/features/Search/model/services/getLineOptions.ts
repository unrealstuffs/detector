import { MarkupConfig } from 'features/SendMarkupConfig/model/types/markupConfig'

interface LineOptions {
	value: string
	label: string
	title: string
}

export const getLineOptions = (config: MarkupConfig) => {
	const options: LineOptions[] = []

	config.zone.directs.forEach(dir => {
		dir.lines.forEach(line => {
			options.push({
				value: line.index.toString(),
				title: line.name,
				label: line.name,
			})
		})
	})

	return options
}
