const sleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchZoneConfig = async (
	setConfiguration: (conf: any) => void,
	accessToken: string | null,
	n: number
) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_EDIT_ZONE_URL}`, {
			method: 'GET',
			headers: {
				Authorization: `${accessToken}`,
			},
		})
		const resData = await response.json()

		if (resData.result === 'success') {
			const tempArr = JSON.parse(resData.data)
			setConfiguration(tempArr.zone.r_00.s)
		} else {
			console.log('Error')
		}
	} catch (err) {
		if (n <= 1) throw err
		await sleep(1000)
		fetchZoneConfig(setConfiguration, accessToken, n - 1)
	}
}

export const fetchCameraConfig = async (
	setCameraConfig: (conf: any) => void,
	accessToken: string | null
) => {
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
}

export const fetchDetectorConfig = async (
	setDetectorConfig: (conf: any) => void,
	accessToken: string | null
) => {
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
}
