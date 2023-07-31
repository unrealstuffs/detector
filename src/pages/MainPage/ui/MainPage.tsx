import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../shared/hooks/useTypedSelector'
import { AppDispatch } from '../../../app/store'
import { getConfiguration } from '../../../app/store/slices/configurationSlice'
import { getCameraConfig } from '../../../app/store/slices/cameraSlice'
import Header from '../../../widgets/Header/Header'
import Layout from '../../../shared/ui/Layout/Layout'
import Video from '../../../widgets/Video/Video'
import SideBar from '../../../widgets/Sidebar/SideBar'

const MainPage = () => {
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

export default MainPage
