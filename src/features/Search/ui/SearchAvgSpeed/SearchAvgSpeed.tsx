import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { avgSpeedActions } from 'widgets/Data/model/slices/avgSpeedSlice'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import { searchAvgSpeed } from 'widgets/Data/model/api/searchAvgSpeed'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import Select from 'shared/ui/Select/Select'
import { getLineOptions } from 'features/Search/model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirectionsOptions'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Input } from 'shared/ui/Input/Input'

export const SearchAvgSpeed = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.avgSpeed)
	const { configuration } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(avgSpeedActions.resetData())
		dispatch(avgSpeedActions.resetStatus())
		dispatch(avgSpeedActions.resetBlockFetching())
		dispatch(avgSpeedActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		dispatch(searchAvgSpeed(searchObject))
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
					dispatch(avgSpeedActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(avgSpeedActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
				<Select
					options={getLineOptions(configuration)}
					onChange={value =>
						dispatch(avgSpeedActions.setLines(value))
					}
				/>
				<Select
					options={getDirectionsOptions(configuration)}
					onChange={value =>
						dispatch(avgSpeedActions.setDirections(value))
					}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Средняя скорость...'
						value={searchObject.avgSpeed.value}
						onChange={value =>
							dispatch(avgSpeedActions.setAvgSpeedValue(value))
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
								avgSpeedActions.setAvgSpeedStatement(value)
							)
						}
					/>
				</HStack>
			</SearchFields>
		</SearchContainer>
	)
}
