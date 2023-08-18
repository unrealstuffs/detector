import { FC } from 'react'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Select from 'shared/ui/Select/Select'

const Directions: FC<{
	setDirections: (direction: string) => void
}> = ({ setDirections }) => {
	const { configuration } = useTypedSelector(state => state.markup)

	const options = [{ title: 'Все направления', value: '' }]

	Object.keys(configuration).forEach((val, index) => {
		options.push({
			value: val,
			title: configuration[val].reverseDirection
				? `d-${index + 1} (Обратное)`
				: `d-${index + 1} (Прямое)`,
		})
	})

	return <Select options={options} onChange={value => setDirections(value)} />
}

export default Directions
