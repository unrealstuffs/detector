import './Modal.sass'
import Button from '../../ui/Button/Button'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

const Modal = () => {
	const [detectorId, setDetectorId] = useState('')

	const { accessToken } = useTypedSelector(state => state.user)
	const { setDetector, toggleModal } = useActions()

	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const navigate = useNavigate()

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleConnect = async (id: string) => {
		if (!id) {
			setError('Id не должен быть пустым')
			setTimeout(() => {
				setError('')
			}, 4000)
			return false
		}
		setLoading(true)

		const response = await fetch(`${process.env.REACT_APP_CONNECT_URL}`, {
			method: 'PUT',
			body: JSON.stringify({ id }),
			headers: {
				Authorization: `${accessToken}`,
			},
		})
		const data = await response.json()
		if (data.result === 'success') {
			setDetector({ id })
			setLoading(false)
			setSuccess(true)
			navigate(`/detectors/${id}`)
			toggleModal({ show: false })
		}
	}

	return (
		<div className='modal'>
			<div className='modal-content'>
				{loading && (
					<div className='loading'>
						<img src='/assets/loader.gif' alt='Loading...' />
						<p>Подключение...</p>
					</div>
				)}
				{!loading && (
					<>
						<div
							className='modal-close'
							onClick={() => toggleModal({ show: false })}
						>
							<img src='/assets/close.svg' alt='Close' />
						</div>
						<div className='modal-header'>
							{!success && 'Подключиться к детектору'}
							{success && 'Детектор подключен!'}
						</div>
						<div className='modal-body'>
							{!success && (
								<form
									onSubmit={e => {
										e.preventDefault()
										handleConnect(detectorId)
									}}
								>
									<div className='input'>
										<label htmlFor='detector'>
											Детектор
										</label>
										<input
											id='detector'
											ref={inputRef}
											type='text'
											value={detectorId}
											onChange={e =>
												setDetectorId(e.target.value)
											}
										/>
									</div>
									{error && (
										<div className='error'>{error}</div>
									)}
									<Button>Подключиться</Button>
								</form>
							)}
							{success && (
								<>
									<img
										className='success'
										src='/assets/success.svg'
										alt='Success!'
									/>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Modal
