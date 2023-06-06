import React from 'react'
import SearchData from '../../types/SearchData.interface'
import Select from '../../../../../../ui/Select/Select'

const Vehicles = ({
	setSearchData,
}: {
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}) => {
	return (
		<Select
			options={[
				{ title: 'Тип ТС', value: '' },
				{ title: 'Автобус', value: 'автобус' },
				{ title: 'Легковой', value: 'легковой' },
				{ title: 'Микроавтобус', value: 'микроавтобус' },
				{ title: 'Небольшой грузовик', value: 'небольшой грузовик' },
			]}
			onChange={e =>
				setSearchData(prev => ({
					...prev,
					vehicleTypes: e.target.value ? [e.target.value] : [],
				}))
			}
		/>
	)
}

export default Vehicles
