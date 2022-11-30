import { Navigate } from 'react-router-dom'
import Connect from '../components/parts/Connect/Connect'
import Header from '../components/parts/Header/Header'
import Modal from '../components/parts/Modal/Modal'
import Container from '../components/ui/Container/Container'
import { useTypedSelector } from '../hooks/useTypedSelector'

const MainScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { show } = useTypedSelector(state => state.modal)
	return (
		<>
			{!accessToken && <Navigate to='/login' replace={true} />}
			<Header />
			<Container>
				<Connect />
			</Container>
			{show && <Modal />}
		</>
	)
}

export default MainScreen
