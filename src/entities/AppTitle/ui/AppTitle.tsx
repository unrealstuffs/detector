import { useEffect } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { getDetectorName } from '../model/services/fetchDetectorName'

export const AppTitle = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const loadTitle = async () => {
			await dispatch(getDetectorName())
		}

		loadTitle()
	}, [dispatch])
	return null
}
