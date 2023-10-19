import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { typesActions } from 'widgets/Data'
import { searchTypes } from 'widgets/Data/model/api/searchTypes'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import SearchFields from '../common/SearchFields/SearchFields'
import LicensePlatesInputs from './LicensePlatesInputs'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Input } from 'shared/ui/Input/Input'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { getLineOptions } from 'features/Search/model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirectionsOptions'

export const SearchTypes = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.types)
	const { configuration } = useTypedSelector(state => state.markup)
	const { vehicleTypes } = useTypedSelector(state => state.vehicleTypes)

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
		if (
			!searchObject.timestampRange.from ||
			!searchObject.timestampRange.to
		) {
			return
		}
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
				<AppSelect
					isMulti
					placeholder='Все полосы'
					options={getLineOptions(configuration)}
					onChange={values => {
						const lines = values.map(val => val.value)
						dispatch(typesActions.setLines(lines))
					}}
				/>
				<AppSelect
					isMulti
					placeholder='Все направления'
					options={getDirectionsOptions(configuration)}
					onChange={values => {
						const directions = values.map(val => val.value)
						dispatch(typesActions.setDirections(directions))
					}}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						placeholder='Цвет машины'
						value={searchObject.colors.join(', ')}
						onChange={value =>
							dispatch(typesActions.setColors(value))
						}
					/>
					<Input
						size='s'
						placeholder='Марка машины'
						value={searchObject.vehicle_makes.join(', ')}
						onChange={value =>
							dispatch(typesActions.setVehicleMakes(value))
						}
					/>
				</HStack>
				<AppSelect
					isMulti
					placeholder='Все типы ТС'
					options={vehicleTypes.map(type => ({
						label: type,
						value: type,
					}))}
					onChange={values => {
						const vehicleTypes = values.map(val => val.value)
						dispatch(typesActions.setVehicleTypes(vehicleTypes))
					}}
				/>
				<LicensePlatesInputs />
			</SearchFields>
		</SearchContainer>
	)
}
