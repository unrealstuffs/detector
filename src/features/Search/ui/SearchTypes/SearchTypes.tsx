import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { typesActions } from 'widgets/Data'
import { searchTypes } from 'widgets/Data/model/api/searchTypes'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Select from 'shared/ui/Select/Select'
import { getLineOptions } from '../../model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirectionsOptions'
import { getVehiclesOptions } from 'features/Search/model/services/getVehiclesOptions'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import SearchFields from '../common/SearchFields/SearchFields'
import LicensePlatesInputs from './LicensePlatesInputs'

export const SearchTypes = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.types)
	const { configuration } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(typesActions.resetBlockFetching())
		dispatch(typesActions.resetStatus())
		dispatch(typesActions.resetData())
		dispatch(typesActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		dispatch(searchTypes(searchObject))
	}

	return (
		<SearchContainer>
			<DatePickers
				disabled={status === 'loading'}
				ref={datePickersRef}
				defaultDateFrom={searchObject.timestampRange.from}
				defaultDateTo={searchObject.timestampRange.to}
				resetSearchHandler={resetSearchHandler}
				searchHandler={sendSearchHandler}
				setTimestampFrom={date =>
					dispatch(typesActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(typesActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
				<Select
					options={getLineOptions(configuration)}
					onChange={value => dispatch(typesActions.setLines(value))}
				/>
				<Select
					options={getDirectionsOptions(configuration)}
					onChange={value =>
						dispatch(typesActions.setDirections(value))
					}
				/>
				<Select
					options={getVehiclesOptions()}
					onChange={value =>
						dispatch(typesActions.setVehicleTypes(value))
					}
				/>
				<LicensePlatesInputs />
			</SearchFields>
		</SearchContainer>
	)
}
