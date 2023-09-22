import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Select from 'shared/ui/Select/Select'
import { getLineOptions } from '../../model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirectionsOptions'
import { Input } from 'shared/ui/Input/Input'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import { intensityActions } from 'widgets/Data/model/slices/intensitySlice'
import { searchIntensity } from 'widgets/Data/model/api/searchIntensity'

export const SearchIntensity = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.intensity)
	const { configuration } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(intensityActions.resetData())
		dispatch(intensityActions.resetStatus())
		dispatch(intensityActions.resetBlockFetching())
		dispatch(intensityActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		dispatch(searchIntensity(searchObject))
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
					dispatch(intensityActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(intensityActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
				<Select
					options={getLineOptions(configuration)}
					onChange={value =>
						dispatch(intensityActions.setLines(value))
					}
				/>
				<Select
					options={getDirectionsOptions(configuration)}
					onChange={value =>
						dispatch(intensityActions.setDirections(value))
					}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Интенсивность...'
						value={searchObject.intensity.value}
						onChange={value =>
							dispatch(intensityActions.setIntensityValue(value))
						}
					/>
					<Select
						options={[
							{ title: 'Больше', value: 'more' },
							{ title: 'Меньше', value: 'less' },
							{ title: 'Равно', value: 'equal' },
						]}
						onChange={value =>
							dispatch(
								intensityActions.setIntensityStatement(value)
							)
						}
					/>
				</HStack>
			</SearchFields>
		</SearchContainer>
	)
}
