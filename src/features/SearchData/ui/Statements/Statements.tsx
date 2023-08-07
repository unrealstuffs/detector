import { FC } from 'react'
import SearchData from '../../model/types/SearchData'
import Select from '../../../../shared/ui/Select/Select'

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
			onChange={value =>
				setSearchData(prev => ({
					...prev,
					quantity: {
						...prev.quantity,
						statement: value,
					},
				}))
			}
		/>
	)
}

export default Statements
