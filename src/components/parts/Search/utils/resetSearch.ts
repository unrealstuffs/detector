import { Fetch } from '../../../../types/Fetch'
import SearchData from '../types/SearchData.interface'

export const resetSearch = (
	setStatus: (status: Fetch) => void,
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>,
	resetSearchFor: (tableName: string) => void,
	tableName: string
) => {
	setStatus('init')

	setSearchData({
		licensePlates: [],
		vehicleTypes: [],
		directions: [],
		lines: [],
		interval: 0,
		intensity: { value: '', statement: 'more' },
		quantity: { value: '', statement: 'more' },
		avgSpeed: { value: '', statement: 'more' },
		avgDelay: { value: '', statement: 'more' },
		density: { value: '', statement: 'more' },
		timestampRange: {
			from: '',
			to: '',
		},
	})

	resetSearchFor(tableName)

	//@ts-ignore
	setData(prev => ({
		...prev,
		[tableName]: [],
	}))
}
