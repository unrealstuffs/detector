import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Input } from 'shared/ui/Input/Input'
import { searchDensity } from 'widgets/Data/model/api/searchDensity'
import { densityActions } from 'widgets/Data/model/slices/densitySlice'
import AppSelect from 'shared/ui/AppSelect/AppSelect'

export const SearchDensity = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.density)

	const dispatch = useAppDispatch()

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		dispatch(densityActions.resetData())
		dispatch(densityActions.resetStatus())
		dispatch(densityActions.resetBlockFetching())
		dispatch(densityActions.resetSearchData())
	}

	const sendSearchHandler = () => {
		if (
			!searchObject.timestampRange.from ||
			!searchObject.timestampRange.to
		) {
			return
		}
		dispatch(searchDensity(searchObject))
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
					dispatch(densityActions.setTimestampRangeFrom(date))
				}
				setTimestampTo={date =>
					dispatch(densityActions.setTimestampRangeTo(date))
				}
			/>
			<SearchFields>
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
							dispatch(
								densityActions.setDensityStatement(statement)
							)
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
