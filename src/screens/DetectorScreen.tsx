import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/parts/Header/Header'
import Shot from '../components/parts/Shot/Shot'
import Settings from '../components/parts/Settings/Settings'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import {
	fetchCameraConfig,
	fetchDetectorConfig,
	fetchZoneConfig,
} from './utils'

const DetectorScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { tab } = useTypedSelector(state => state.tabs)
	const { setConfiguration, setCameraConfig, setDetectorConfig } =
		useActions()

	useEffect(() => {
		fetchZoneConfig(setConfiguration, accessToken)
		fetchCameraConfig(setCameraConfig, accessToken)
		fetchDetectorConfig(setDetectorConfig, accessToken)
	}, [accessToken])

	return (
		<>
			{!accessToken && <Navigate to='/login' replace={true} />}
			<Header />
			<div className='grid grid-cols-5 px-4 gap-x-5 justify-between h-full'>
				<Shot isShot={tab === 'shot'} />
				<Settings />
			</div>
		</>
	)
}

export default DetectorScreen
