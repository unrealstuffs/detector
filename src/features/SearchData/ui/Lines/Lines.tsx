import { FC } from 'react'
import SearchData from '../../model/types/SearchData'
import { useTypedSelector } from '../../../../shared/hooks/useTypedSelector'
import Select from '../../../../shared/ui/Select/Select'

const Lines: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
	const { configuration } = useTypedSelector(state => state.markup)

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
			onChange={value =>
				setSearchData(prev => ({
					...prev,
					lines: value ? [value] : [],
				}))
			}
		/>
	)
}

export default Lines
