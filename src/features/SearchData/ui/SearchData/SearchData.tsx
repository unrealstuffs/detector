import { useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'react-tooltip/dist/react-tooltip.css'
import cls from './SearchData.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { FetchStatus } from 'shared/types/FetchStatus'
import SearchDataSchema from '../../model/types/SearchData'
import { searchActions } from '../../model/slices/searchSlice'
import { initialSearchState } from '../../model/consts/initialSearchState'
import { searchTypes } from '../../model/services/searchTypes'
import { searchComposition } from '../../model/services/searchComposition'
import { searchDelay } from '../../model/services/searchDelay'
import { searchDensity } from '../../model/services/searchDensity'
import { searchIntensity } from '../../model/services/searchIntensity'
import { searchSpeed } from '../../model/services/searchSpeed'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { TableNameType, dataActions } from 'widgets/DataList'
import Button from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import DatePickers from '../DatePickers/DatePickers'
import SearchFields from '../SearchFields/SearchFields'

interface SearchDataProps {
	className?: string
	tableName: TableNameType
	setStatus: (status: FetchStatus) => void
}

export const SearchData = (props: SearchDataProps) => {
	const { tableName, setStatus, className } = props
	const searchRef = useRef<Flatpickr>(null)
	const secondSearchRef = useRef<Flatpickr>(null)
	const datePickersRef = useRef<{ clear: () => void }>()

	const dispatch = useAppDispatch()

	const [searchData, setSearchData] = useState(
		initialSearchState as SearchDataSchema
	)

	const resetSearchHandler = () => {
		if (datePickersRef.current) {
			datePickersRef.current.clear()
		}
		searchRef.current!.flatpickr.clear()
		secondSearchRef.current!.flatpickr.clear()
		setStatus('init')
		setSearchData(initialSearchState as SearchDataSchema)
		searchActions.resetSearchFor(tableName)
		dataActions.resetData(tableName)
	}

	const sendSearchHandler = () => {
		setStatus('loading')
		searchActions.setSearchFor(tableName)
		dataActions.resetData(tableName)

		switch (tableName) {
			case 'types':
				dispatch(searchTypes(searchData))
				break
			case 'composition':
				dispatch(searchComposition(searchData))
				break
			case 'delay':
				dispatch(searchDelay(searchData))
				break
			case 'density':
				dispatch(searchDensity(searchData))
				break
			case 'intensity':
				dispatch(searchIntensity(searchData))
				break
			case 'speed':
				dispatch(searchSpeed(searchData))
				break
			default:
				return
		}
	}

	return (
		<div className={classNames(cls.SearchData, {}, [className])}>
			<HStack
				align='center'
				justify='between'
				gap='8'
				className={cls.datePicker}
			>
				<DatePickers
					defaultDateFrom={searchData.timestampRange.from}
					defaultDateTo={searchData.timestampRange.to}
					minDate={searchData.timestampRange.to}
					setSearchData={setSearchData}
					tableName={tableName}
					ref={datePickersRef}
				/>
				<AiOutlineClose
					size={20}
					className={cls.delete}
					onClick={resetSearchHandler}
				/>
				<Button
					size='m'
					className={cls.button}
					onClick={sendSearchHandler}
				>
					Поиск
				</Button>
			</HStack>
			<SearchFields
				searchData={searchData}
				setSearchData={setSearchData}
				tableName={tableName}
			/>
		</div>
	)
}
