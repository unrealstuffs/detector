import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'
import { getDetectorName } from './store/slices/detectorSlice'
import { useTypedSelector } from '../shared/hooks/useTypedSelector'
import { MainPage } from '../pages/MainPage'
import { LoginPage } from '../pages/LoginPage'

const App = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { detectorName } = useTypedSelector(state => state.detector)

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		const loadTitle = async () => {
			await dispatch(getDetectorName(`${accessToken}`))
		}

		loadTitle()
	}, [dispatch, accessToken])

	useEffect(() => {
		document.title = `Детектор ID ${detectorName}`
	}, [detectorName])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
