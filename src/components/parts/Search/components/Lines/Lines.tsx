import { useState, useEffect, FC } from 'react'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import SearchData from '../../types/SearchData.interface'
import Select from '../../../../ui/Select/Select'

const Lines: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
	const [linesCount, setLinesCount] = useState(0)
	const { configuration } = useTypedSelector(state => state.detector)

	useEffect(() => {
		for (const key in configuration) {
			if (key.startsWith('d_')) {
				const field = configuration[key]['s']
				let count = 0

				for (const subKey in field) {
					if (subKey.startsWith('l_')) {
						count++
					}
				}

				if (count > linesCount) {
					setLinesCount(count)
				}
			}
		}
	}, [])

	const options = [{ title: 'Все полосы', value: '' }]

	for (let i = 0; i < linesCount; i++) {
		options.push({ value: 'l_' + i, title: `l-${i + 1}` })
	}

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
