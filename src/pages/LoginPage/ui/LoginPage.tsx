import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../../shared/hooks/useTypedSelector'
import Background from '../../../shared/ui/Background/Background'
import Login from '../../../features/Login/Login'

const LoginScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)

	return (
		<>
			{accessToken && <Navigate to='/' replace={true} />}
			<Background>
				<Login />
			</Background>
		</>
	)
}

export default LoginScreen
