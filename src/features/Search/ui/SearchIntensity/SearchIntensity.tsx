import { useRef } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Input } from 'shared/ui/Input/Input'
import SearchContainer from '../common/SearchContainer/SearchContainer'
import DatePickers from '../common/DatePickers/DatePickers'
import SearchFields from '../common/SearchFields/SearchFields'
import { intensityActions } from 'widgets/Data/model/slices/intensitySlice'
import { searchIntensity } from 'widgets/Data/model/api/searchIntensity'
import AppSelect from 'shared/ui/AppSelect/AppSelect'

export const SearchIntensity = () => {
	const datePickersRef = useRef<{ clear: () => void }>()
	const { searchObject, status } = useTypedSelector(state => state.intensity)

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
		if (
			!searchObject.timestampRange.from ||
			!searchObject.timestampRange.to
		) {
			return
		}
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
								intensityActions.setIntensityStatement(
									statement
								)
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
