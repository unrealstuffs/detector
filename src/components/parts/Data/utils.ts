import { DataState } from '../../../types/Data'

export const fetchTypes = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const types = await fetch(
		`${process.env.REACT_APP_VEHICLE_TYPES_AND_PLATES}`,
		{
			method: 'GET',
			headers: {
				Authorization: `${accessToken}`,
			},
		}
	)

	const dataTypes = await types.json()

	//@ts-ignore
	setData(prev => ({
		...prev,
		types: [...JSON.parse(dataTypes.data || []), ...(prev.types || [])],
	}))
}

export const fetchIntensity = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const response = await fetch(`${process.env.REACT_APP_TRAFFIC_INTENSITY}`, {
		method: 'GET',
		headers: {
			Authorization: `${accessToken}`,
		},
	})

	const data = await response.json()
	//@ts-ignore
	setData(prev => ({
		...prev,
		intensity: [...JSON.parse(data.data || []), ...(prev.intensity || [])],
	}))
}

export const fetchComposition = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const response = await fetch(`${process.env.REACT_APP_VEH_COMPOSITION}`, {
		method: 'GET',
		headers: {
			Authorization: `${accessToken}`,
		},
	})

	const data = await response.json()
	//@ts-ignore
	setData(prev => ({
		...prev,
		composition: [
			...JSON.parse(data.data || []),
			...(prev.composition || []),
		],
	}))
}

export const fetchSpeed = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const response = await fetch(`${process.env.REACT_APP_AVERAGE_SPEED}`, {
		method: 'GET',
		headers: {
			Authorization: `${accessToken}`,
		},
	})

	const data = await response.json()
	//@ts-ignore
	setData(prev => ({
		...prev,
		speed: [...JSON.parse(data.data || []), ...(prev.speed || [])],
	}))
}

export const fetchDelay = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const response = await fetch(`${process.env.REACT_APP_AVERAGE_DELAY}`, {
		method: 'GET',
		headers: {
			Authorization: `${accessToken}`,
		},
	})

	const data = await response.json()
	//@ts-ignore
	setData(prev => ({
		...prev,
		delay: [...JSON.parse(data.data || []), ...(prev.delay || [])],
	}))
}

export const fetchDensity = async (
	setData: (state: DataState) => void,
	accessToken: string | null
) => {
	const response = await fetch(`${process.env.REACT_APP_TRAFFIC_DENSITY}`, {
		method: 'GET',
		headers: {
			Authorization: `${accessToken}`,
		},
	})

	const data = await response.json()
	//@ts-ignore
	setData(prev => ({
		...prev,
		density: [...JSON.parse(data.data || []), ...(prev.density || [])],
	}))
}
