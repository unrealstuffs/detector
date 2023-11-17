import { useEffect } from 'react'
import { AiOutlineDrag, AiOutlineGateway } from 'react-icons/ai'
import Button from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './Mods.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'

const Mods = () => {
	const { shiftPressed, ctrlPressed } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	useEffect(() => {
		window.addEventListener('keydown', e => {
			if (e.key === 'Shift' && !shiftPressed) {
				dispatch(markupActions.setShiftPressed(true))
			}
			if (e.key === 'Control' && !ctrlPressed) {
				dispatch(markupActions.setCtrlPressed(true))
			}
		})
		window.addEventListener('keyup', e => {
			if (e.key === 'Shift' && shiftPressed) {
				dispatch(markupActions.setShiftPressed(false))
			}
			if (e.key === 'Control' && ctrlPressed) {
				dispatch(markupActions.setCtrlPressed(false))
			}
		})

		return () => {
			window.removeEventListener('keydown', () => {})
			window.removeEventListener('keyup', () => {})
		}
	}, [shiftPressed, ctrlPressed, dispatch])

	return (
		<HStack gap='8' className={cls.Mods}>
			<Button
				color={shiftPressed ? 'primary' : 'outline'}
				size='s'
				variant='squared'
				onClick={() => dispatch(markupActions.setShiftPressed(!shiftPressed))}
				title='Перемещение полосы (L.Shift)'
			>
				<AiOutlineDrag size={18} />
			</Button>
			<Button
				color={ctrlPressed ? 'primary' : 'outline'}
				size='s'
				variant='squared'
				onClick={() => dispatch(markupActions.setCtrlPressed(!ctrlPressed))}
				title='Выравнивание точек (L.Ctrl)'
			>
				<AiOutlineGateway size={18} />
			</Button>
		</HStack>
	)
}

export default Mods
