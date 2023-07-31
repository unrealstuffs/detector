import { Navigate } from 'react-router-dom'
import Login from '../components/parts/Login/Login'
import Background from '../components/ui/Background/Background'
import { useTypedSelector } from '../hooks/useTypedSelector'

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
