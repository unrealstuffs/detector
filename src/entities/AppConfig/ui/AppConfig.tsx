import { useEffect } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { getAppConfig } from '../model/services/getAppConfig'

export const AppConfig = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const loadConfig = async () => {
			await dispatch(getAppConfig())
		}

		loadConfig()
	}, [dispatch])
	return null
}
