import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Input } from 'shared/ui/Input/Input'
import { avgDelayActions } from 'widgets/Data/model/slices/avgDelaySlice'
import { searchAvgDelay } from 'widgets/Data/model/api/searchAvgDelay'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { getLineOptions } from 'features/Search/model/services/getLineOptions'
import { getDirectionsOptions } from 'features/Search/model/services/getDirOptions'

export const SearchAvgDelay = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.avgDelay)
	const { markupConfig } = useTypedSelector(state => state.markup)

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
		if (!searchObject.timestampRange.from || !searchObject.timestampRange.to) {
			return
		}
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
				setTimestampFrom={date => dispatch(avgDelayActions.setTimestampRangeFrom(date))}
				setTimestampTo={date => dispatch(avgDelayActions.setTimestampRangeTo(date))}
			/>
			<SearchFields>
				<AppSelect
					isMulti
					placeholder='Все полосы'
					options={getLineOptions(markupConfig)}
					onChange={values => {
						const lines = values.map(val => val.value)
						dispatch(avgDelayActions.setLines(lines))
					}}
				/>
				<AppSelect
					isMulti
					placeholder='Все направления'
					options={getDirectionsOptions(markupConfig)}
					onChange={values => {
						const directions = values.map(val => val.value)
						dispatch(avgDelayActions.setDirections(directions))
					}}
				/>
				<HStack gap='8' align='stretch'>
					<Input
						size='s'
						type='number'
						placeholder='Средняя задержка...'
						value={searchObject.avgDelay.value}
						onChange={value => dispatch(avgDelayActions.setAvgDelayValue(value))}
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
							dispatch(avgDelayActions.setAvgDelayStatement(statement))
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
