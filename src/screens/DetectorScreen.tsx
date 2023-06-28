import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/parts/Header/Header'
import SideBar from '../components/parts/SideBar/SideBar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Video from '../components/parts/Video/Video'
import { useDispatch } from 'react-redux'
import { getConfiguration } from '../store/slices/configurationSlice'
import { AppDispatch } from '../store'
import { getCameraConfig } from '../store/slices/cameraSlice'
import Layout from '../components/ui/Layout/Layout'

const DetectorScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getConfiguration(`${accessToken}`))
			await dispatch(getCameraConfig(`${accessToken}`))
		}
		fetchData()
	}, [accessToken, dispatch])

	return (
		<>
			{!accessToken && <Navigate to='/login' replace={true} />}
			<Header />
			<Layout>
				{process.env.NODE_ENV === 'development' ? (
					<Video videoSrc='/assets/videoplayback.mp4' />
				) : (
					<Video
						videoSrc={`http://${
							window.location.host
						}/pipeline-stream?reset=${Math.round(
							Math.random() * 1000
						)}`}
					/>
				)}
				<SideBar />
			</Layout>
		</>
	)
}

export default DetectorScreen
