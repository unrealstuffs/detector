import { useActions } from '../../../hooks/useActions'
import './Connect.sass'

const Connect = () => {
	const { toggleModal } = useActions()
	return (
		<div className='connect'>
			<div className='connect-button'>
				<button onClick={() => toggleModal({ show: true })}>
					Подключиться к детектору
				</button>
			</div>
		</div>
	)
}

export default Connect
