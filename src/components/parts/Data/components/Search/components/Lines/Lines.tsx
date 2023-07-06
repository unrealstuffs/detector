import { FC } from 'react'
import SearchData from '../../types/SearchData.interface'
import { useTypedSelector } from '../../../../../../../hooks/useTypedSelector'
import Select from '../../../../../../ui/Select/Select'

const Lines: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
	const { configuration } = useTypedSelector(state => state.configuration)

	const options = [{ title: 'Все полосы', value: '' }]

	Object.keys(configuration).forEach((z, zIndex) => {
		Object.keys(configuration[z].s).forEach((l, lIndex) => {
			options.push({
				value: l,
				title: `d-${zIndex + 1} l-${lIndex + 1}`,
			})
		})
	})

	return (
		<Select
			options={options}
			onChange={e =>
				setSearchData(prev => ({
					...prev,
					lines: e.target.value ? [e.target.value] : [],
				}))
			}
		/>
	)
}

export default Lines
