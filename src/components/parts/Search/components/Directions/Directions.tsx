import { useEffect, FC } from 'react'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import SearchData from '../../types/SearchData.interface'
import Select from '../../../../ui/Select/Select'

const Directions: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
	const { configuration } = useTypedSelector(state => state.detector)

	useEffect(() => {
		for (const key in configuration) {
			if (key.startsWith('d_')) {
			}
		}
	}, [])

	const options = [{ title: 'Все направления', value: '' }]

	Object.keys(configuration).map(val => {
		options.push({
			value: val,
			title: configuration[val].reverseDirection ? 'Обратное' : 'Прямое',
		})
	})

	return (
		<Select
			options={options}
			onChange={e =>
				setSearchData(prev => ({
					...prev,
					directions: e.target.value ? [e.target.value] : [],
				}))
			}
		/>
	)
}

export default Directions
