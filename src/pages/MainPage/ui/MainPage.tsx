import { useEffect } from 'react'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Header } from 'widgets/Header'
import { getConfiguration } from 'features/SendMarkupConfig'
import MainLayout from 'shared/layouts/MainLayout/MainLayout'
import { Sidebar } from 'widgets/Sidebar'
import { VideoMarkup } from 'widgets/VideoMarkup'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchVehicleTypes } from 'entities/TypesSelect/model/services/fetchVehicleTypes'
import { getCameraConfig } from 'features/SendCameraConfig'

const MainPage = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getConfiguration())
			await dispatch(getCameraConfig())
			await dispatch(fetchVehicleTypes())
		}
		fetchData()
	}, [accessToken, dispatch])

	return <MainLayout header={<Header />} sidebar={<Sidebar />} video={<VideoMarkup />} />
}

export default MainPage
