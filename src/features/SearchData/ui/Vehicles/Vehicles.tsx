import React from 'react'
import SearchData from '../../model/types/SearchData'
import Select from 'shared/ui/Select/Select'

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
			onChange={value =>
				setSearchData(prev => ({
					...prev,
					vehicleTypes: value ? [value] : [],
				}))
			}
		/>
	)
}

export default Vehicles
