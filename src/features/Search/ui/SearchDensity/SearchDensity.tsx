import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import Select from 'shared/ui/Select/Select'
import { getLineOptions } from 'features/Search/model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirectionsOptions'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Input } from 'shared/ui/Input/Input'
import { searchDensity } from 'widgets/Data/model/api/searchDensity'
import { densityActions } from 'widgets/Data/model/slices/densitySlice'

export const SearchDensity = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject } = useTypedSelector(state => state.density)
	const { configuration } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(densityActions.resetData())
		dispatch(densityActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		dispatch(searchDensity(searchObject))
	}

	return (
		<SearchContainer>
			<DatePickers
				ref={datePickersRef}
				defaultDateFrom={searchObject.timestampRange.from}
				defaultDateTo={searchObject.timestampRange.to}
				resetSearchHandler={resetSearchHandler}
				searchHandler={sendSearchHandler}
				setTimestampFrom={date =>
					dispatch(densityActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(densityActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
				<Select
					options={getLineOptions(configuration)}
					onChange={value => dispatch(densityActions.setLines(value))}
				/>
				<Select
					options={getDirectionsOptions(configuration)}
					onChange={value =>
						dispatch(densityActions.setDirections(value))
					}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Плотность...'
						value={searchObject.density.value}
						onChange={value =>
							dispatch(densityActions.setDensityValue(value))
						}
					/>
					<Select
						options={[
							{ title: 'Больше', value: 'more' },
							{ title: 'Меньше', value: 'less' },
							{ title: 'Равно', value: 'equal' },
						]}
						onChange={value =>
							dispatch(densityActions.setDensityStatement(value))
						}
					/>
				</HStack>
			</SearchFields>
		</SearchContainer>
	)
}
