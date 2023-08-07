import { FC } from 'react'
import SearchData from '../../model/types/SearchData'
import { useTypedSelector } from '../../../../shared/hooks/useTypedSelector'
import Select from '../../../../shared/ui/Select/Select'

const Directions: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
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

	return (
		<Select
			options={options}
			onChange={value =>
				setSearchData(prev => ({
					...prev,
					directions: value ? [value] : [],
				}))
			}
		/>
	)
}

export default Directions
