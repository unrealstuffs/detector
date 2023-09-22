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
import { avgDelayActions } from 'widgets/Data/model/slices/avgDelaySlice'
import { searchAvgDelay } from 'widgets/Data/model/api/searchAvgDelay'

export const SearchAvgDelay = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.avgDelay)
	const { configuration } = useTypedSelector(state => state.markup)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(avgDelayActions.resetData())
		dispatch(avgDelayActions.resetStatus())
		dispatch(avgDelayActions.resetBlockFetching())
		dispatch(avgDelayActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		dispatch(searchAvgDelay(searchObject))
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
					dispatch(avgDelayActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(avgDelayActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
				<Select
					options={getLineOptions(configuration)}
					onChange={value =>
						dispatch(avgDelayActions.setLines(value))
					}
				/>
				<Select
					options={getDirectionsOptions(configuration)}
					onChange={value =>
						dispatch(avgDelayActions.setDirections(value))
					}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Средняя задержка...'
						value={searchObject.avgDelay.value}
						onChange={value =>
							dispatch(avgDelayActions.setAvgDelayValue(value))
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
								avgDelayActions.setAvgDelayStatement(value)
							)
						}
					/>
				</HStack>
			</SearchFields>
		</SearchContainer>
	)
}
