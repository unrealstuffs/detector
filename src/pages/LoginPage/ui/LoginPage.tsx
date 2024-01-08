import { LoginByUsername } from 'features/LoginByUsername'
import { Navigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Background from 'shared/layouts/LoginPageLayout/LoginPageLayout'

const LoginScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const location = useLocation()
	return (
		<Background>
			{accessToken && (
				<Navigate to='/' replace state={{ from: location }} />
			)}
			<LoginByUsername />
		</Background>
	)
}

export default LoginScreen
