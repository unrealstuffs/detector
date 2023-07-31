import { DataState } from '../../../../../app/types/Data'
import { Fetch } from '../../../../../app/types/Fetch'
import SearchData from '../types/SearchData.interface'

export const sendSearchData = async (
	searchData: SearchData,
	tableName: string,
	accessToken: string | null,
	setStatus: (status: Fetch) => void,
	setData: (data: DataState) => void
) => {
	if (!searchData.timestampRange.from || !searchData.timestampRange.to) {
		return
	}

	let url = ''

	let searchObject = {}

	switch (tableName) {
		case 'types':
			url = `${process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES}`
			searchObject = {
				licensePlates: searchData.licensePlates,
				vehicleTypes: searchData.vehicleTypes,
				directions: searchData.directions,
				lines: searchData.lines,
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		case 'intensity':
			url = `${process.env.REACT_APP_SET_TRAFFIC_INTENSITY}`
			searchObject = {
				directions: searchData.directions,
				lines: searchData.lines,
				intensity: {
					value: searchData.intensity.value || '0',
					statement: searchData.intensity.value
						? searchData.intensity.statement
						: 'more',
				},
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		case 'composition':
			url = `${process.env.REACT_APP_SET_VEH_COMPOSITION}`
			searchObject = {
				vehicleTypes: searchData.vehicleTypes,
				directions: searchData.directions,
				lines: searchData.lines,
				interval: searchData.interval || 0,
				quantity: {
					value: searchData.quantity.value || '0',
					statement: searchData.quantity.value
						? searchData.quantity.statement
						: 'more',
				},
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		case 'speed':
			url = `${process.env.REACT_APP_SET_AVERAGE_SPEED}`
			searchObject = {
				directions: searchData.directions,
				lines: searchData.lines,
				avgSpeed: {
					value: searchData.avgSpeed.value || '0',
					statement: searchData.avgSpeed.value
						? searchData.avgSpeed.statement
						: 'more',
				},
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		case 'delay':
			url = `${process.env.REACT_APP_SET_AVERAGE_DELAY}`
			searchObject = {
				directions: searchData.directions,
				lines: searchData.lines,
				avgDelay: {
					value: searchData.avgDelay.value || '0',
					statement: searchData.avgDelay.value
						? searchData.avgDelay.statement
						: 'more',
				},
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		case 'density':
			url = `${process.env.REACT_APP_SET_TRAFFIC_DENSITY}`
			searchObject = {
				directions: searchData.directions,
				lines: searchData.lines,
				density: {
					value: searchData.density.value || '0',
					statement: searchData.density.value
						? searchData.density.statement
						: 'more',
				},
				timestampRange: {
					from: searchData.timestampRange.from,
					to: searchData.timestampRange.to,
				},
			}
			break
		default:
			return
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify(searchObject),
		})

		const responseData = await response.json()

		if (!JSON.parse(responseData.data).length) {
			setStatus('nodata')

			//@ts-ignore
			setData(prev => ({
				...prev,
				[tableName]: [],
			}))
		} else {
			//@ts-ignore
			setData(prev => ({
				...prev,
				[tableName]: JSON.parse(responseData.data).slice(0, 100),
			}))

			setStatus('success')
		}
	} catch {
		setStatus('error')
	}
}
