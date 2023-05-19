import { FC } from 'react'
import SearchData from '../../types/SearchData.interface'
import Select from '../../../../ui/Select/Select'

const Statements: FC<{
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}> = ({ setSearchData }) => {
	return (
		<Select
			options={[
				{ title: 'Больше', value: 'more' },
				{ title: 'Меньше', value: 'less' },
				{ title: 'Равно', value: 'equal' },
			]}
			onChange={e =>
				setSearchData(prev => ({
					...prev,
					quantity: {
						...prev.quantity,
						statement: e.target.value,
					},
				}))
			}
		/>
	)
}

export default Statements
