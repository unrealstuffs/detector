import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Input } from 'shared/ui/Input/Input'
import { compositionActions } from 'widgets/Data/model/slices/compositionSlice'
import { searchComposition } from 'widgets/Data/model/api/searchComposition'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import IntervalConverter from './IntervalConverter'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { getLineOptions } from 'features/Search/model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirOptions'

export const SearchComposition = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.composition)
	const { vehicleTypes } = useTypedSelector(state => state.vehicleTypes)
	const { markupConfig } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(compositionActions.resetData())
		dispatch(compositionActions.resetStatus())
		dispatch(compositionActions.resetBlockFetching())
		dispatch(compositionActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		if (!searchObject.timestampRange.from || !searchObject.timestampRange.to) {
			return
		}
		dispatch(searchComposition(searchObject))
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
				setTimestampFrom={date => dispatch(compositionActions.setTimestampRangeFrom(date))}
				setTimestampTo={date => dispatch(compositionActions.setTimestampRangeTo(date))}
			/>
			<SearchFields>
				<IntervalConverter />
				<AppSelect
					isMulti
					placeholder='Все полосы'
					options={getLineOptions(markupConfig)}
					onChange={values => {
						const lines = values.map(val => val.value)
						dispatch(compositionActions.setLines(lines))
					}}
				/>
				<AppSelect
					isMulti
					placeholder='Все направления'
					options={getDirectionsOptions(markupConfig)}
					onChange={values => {
						const directions = values.map(val => val.value)
						dispatch(compositionActions.setDirections(directions))
					}}
				/>
				<AppSelect
					isMulti
					placeholder='Все типы ТС'
					options={vehicleTypes.map(type => ({
						label: type,
						value: type,
					}))}
					onChange={values => {
						const vehicleTypes = values.map(val => val.value)
						dispatch(compositionActions.setVehicleTypes(vehicleTypes))
					}}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Количество...'
						value={searchObject.quantity.value}
						onChange={value => dispatch(compositionActions.setQuantityValue(value))}
					/>
					<AppSelect
						options={[
							{ label: 'Больше', value: 'more' },
							{ label: 'Меньше', value: 'less' },
							{ label: 'Равно', value: 'equal' },
						]}
						defaultValue={{ label: 'Больше', value: 'more' }}
						onChange={value => {
							if (!value) return
							const { value: statement } = value
							dispatch(compositionActions.setQuantityStatement(statement))
						}}
						styles={{
							container: styles => ({ ...styles, width: '100%' }),
						}}
					/>
				</HStack>
			</SearchFields>
		</SearchContainer>
	)
}
