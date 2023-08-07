import { Navigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../../shared/hooks/useTypedSelector'

interface RequireAuthProps {
	children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
	const { accessToken } = useTypedSelector(state => state.user)
	const location = useLocation()

	if (!accessToken) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}
