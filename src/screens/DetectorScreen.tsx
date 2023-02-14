import { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Detector from '../components/parts/Detector/Detector'
import Header from '../components/parts/Header/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const DetectorScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { setConfiguration, setCameraConfig, setDetectorConfig, setData } =
		useActions()

	const fetchTypes = useCallback(async () => {
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

		if (dataTypes) {
			setData({
				types: JSON.parse(dataTypes.data),
				intensity: [],
				composition: [],
				speed: [],
				delay: [],
				density: [],
			})
		}
	}, [accessToken, setData])

	const fetchData = useCallback(async () => {
		const [intensity, composition, speed, delay, density] =
			await Promise.all([
				fetch(`${process.env.REACT_APP_TRAFFIC_INTENSITY}`, {
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_VEH_COMPOSITION}`, {
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_AVERAGE_SPEED}`, {
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_AVERAGE_DELAY}`, {
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_TRAFFIC_DENSITY}`, {
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
			])
		const dataIntensity = await intensity.json()
		const dataComposition = await composition.json()
		const dataSpeed = await speed.json()
		const dataDelay = await delay.json()
		const dataDensity = await density.json()

		setData({
			types: [],
			intensity: JSON.parse(dataIntensity.data || []),
			composition: JSON.parse(dataComposition.data || []),
			speed: JSON.parse(dataSpeed.data || []),
			delay: JSON.parse(dataDelay.data || []),
			density: JSON.parse(dataDensity.data || []),
		})
	}, [accessToken, setData])

	const fetchZoneConfig = useCallback(async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_EDIT_ZONE_URL}`,
				{
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const resData = await response.json()

			if (resData.result === 'success') {
				const tempArr = JSON.parse(resData.data)
				setConfiguration(tempArr.zone.r_00.s)
			} else {
				console.log('Error')
			}
		} catch (err) {
			console.log(err)
		}
	}, [accessToken, setConfiguration])

	const fetchCameraConfig = useCallback(async () => {
		try {
			const [zoom, focus, servoX, servoY, filter] = await Promise.all([
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ read: 'ZOOM' }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ read: 'FOCUS' }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ read: 'SERVO_X' }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ read: 'SERVO_Y' }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ read: 'IR_CUT' }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
			])
			const dataZoom = await zoom.json()
			const dataFocus = await focus.json()
			const dataServoX = await servoX.json()
			const dataServoY = await servoY.json()
			const dataFilter = await filter.json()
			setCameraConfig({
				dryCont: true,
				zoom: dataZoom.data.ZOOM,
				focus: dataFocus.data.FOCUS,
				servoX: dataServoX.data.SERVO_X,
				servoY: dataServoY.data.SERVO_Y,
				filter: dataFilter.data.IR_CUT === 'on' ? true : false,
			})
		} catch (err) {
			console.log(err)
		}
	}, [accessToken, setCameraConfig])

	const fetchDetectorConfig = useCallback(async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_DRY_CONTACT_URL}`,
				{
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const resData = await response.json()

			if (resData.result === 'success') {
				setDetectorConfig(resData.data)
			} else {
				console.log('Error')
			}
		} catch (err) {
			console.log(err)
		}
	}, [accessToken, setDetectorConfig])

	useEffect(() => {
		fetchZoneConfig()
		fetchCameraConfig()
		fetchDetectorConfig()

		fetchTypes()
		fetchData()
		const fetchTimer = setInterval(fetchData, 1000 * 60)
		const fetchTypesTimer = setInterval(fetchTypes, 1000 * 10)

		return () => {
			clearInterval(fetchTimer)
			clearInterval(fetchTypesTimer)
		}
	}, [
		fetchZoneConfig,
		fetchCameraConfig,
		fetchDetectorConfig,
		fetchData,
		fetchTypes,
	])

	return (
		<>
			{!accessToken && <Navigate to='/login' replace={true} />}
			<Header />
			<Detector />
		</>
	)
}

export default DetectorScreen
