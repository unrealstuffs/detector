import AppRouter from './providers/RouterProvider/AppRouter'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useEffect } from 'react'
import { getDetectorName } from 'entities/FetchTitle/model/services/fetchDetectorName'

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const loadTitle = async () => {
			await dispatch(getDetectorName())
		}

		loadTitle()
	}, [dispatch])

	return <AppRouter />
}

export default App
