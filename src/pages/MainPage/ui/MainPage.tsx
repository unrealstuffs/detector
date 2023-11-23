import { useEffect } from 'react'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Header } from 'widgets/Header'
import MainLayout from 'shared/layouts/MainLayout/MainLayout'
import { Sidebar } from 'widgets/Sidebar'
import { VideoMarkup } from 'widgets/VideoMarkup'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchVehicleTypes } from 'entities/TypesSelect/model/services/fetchVehicleTypes'
import { getMarkupConfig } from 'features/SendMarkupConfig/model/services/getMarkupConfig'
import { getCameraConfig } from 'features/SendCameraConfig'

const MainPage = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getMarkupConfig())
			await dispatch(fetchVehicleTypes())
			await dispatch(getCameraConfig())
		}
		fetchData()
	}, [accessToken, dispatch])

	return <MainLayout header={<Header />} sidebar={<Sidebar />} video={<VideoMarkup />} />
}

export default MainPage
