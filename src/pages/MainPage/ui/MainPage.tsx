import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../shared/hooks/useTypedSelector'
import { AppDispatch } from '../../../app/store'
import { Header } from '../../../widgets/Header'
import { getConfiguration } from 'features/SendMarkupConfig/model/services/getConfiguration'
import { getCameraConfig } from 'features/SendCameraConfig'
import MainLayout from 'shared/layouts/MainLayout/MainLayout'
import { Sidebar } from 'widgets/Sidebar'
import { VideoMarkup } from 'widgets/VideoMarkup'

const MainPage = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getConfiguration())
			await dispatch(getCameraConfig())
		}
		fetchData()
	}, [accessToken, dispatch])

	return (
		<MainLayout
			header={<Header />}
			sidebar={<Sidebar />}
			video={<VideoMarkup />}
		/>
	)
}

export default MainPage
