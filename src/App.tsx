import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelector'
import DetectorScreen from './screens/DetectorScreen'
import LoginScreen from './screens/LoginScreen'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'
import { getDetectorName } from './store/slices/detectorSlice'

const App = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { detectorName } = useTypedSelector(state => state.detector)

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		const loadTitle = async () => {
			await dispatch(getDetectorName(`${accessToken}`))
		}

		loadTitle()
	}, [])

	useEffect(() => {
		document.title = `Детектор ID ${detectorName}`
	}, [detectorName])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<DetectorScreen />} />
				<Route path='/login' element={<LoginScreen />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
