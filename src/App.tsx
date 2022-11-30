import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'
import DetectorScreen from './screens/DetectorScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { setDetectorName } = useActions()
	useEffect(() => {
		const loadTitle = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_DEVICE_HOSTNAME}`,
					{
						headers: {
							Authorization: `${accessToken}`,
						},
					}
				)
				const data = await response.json()
				document.title = data.data
				setDetectorName(data.data)
			} catch (err) {
				document.title = 'dtm-'
			}
		}

		loadTitle()
	}, [])

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
