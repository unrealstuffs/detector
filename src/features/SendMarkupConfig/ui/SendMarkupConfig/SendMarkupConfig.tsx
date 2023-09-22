import cls from './SendMarkupConfig.module.scss'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import { sendConfiguration } from '../../model/services/sendConfiguration'
import { markupActions } from '../../model/slices/markupSlice'
import ZonesConfig from '../ZonesConfig/ZonesConfig'
import { Text } from 'shared/ui/Text/Text'
import LinesConfig from '../LinesConfig/LinesConfig'
import CounterConfig from '../CounterConfig/CounterConfig'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HStack } from 'shared/ui/Stack/HStack/HStack'

export const SendMarkupConfig = () => {
	const { configuration, selectedPolygon, status } = useTypedSelector(
		state => state.markup
	)
	const dispatch = useAppDispatch()

	const sendConfigurationHandler = async () => {
		const result = await dispatch(sendConfiguration())
		if (sendConfiguration.fulfilled.match(result)) {
			toast.success('Отправлено!')
		} else {
			if (result.payload) {
				toast.error(`Ошибка отправки данных: ${result.payload}`)
			}
		}
	}

	const markupConfigBlocks = useMemo(
		() => [
			{
				title: 'Направления',
				buttonTitle: 'Новое направление',
				buttonAction: () => dispatch(markupActions.addZone()),
				buttonDisabled: false,
				configElement: (
					<ZonesConfig
						configuration={configuration}
						selectedPolygon={selectedPolygon}
					/>
				),
			},
			{
				title: 'Полосы',
				buttonTitle: 'Новая полоса',
				buttonAction: () => dispatch(markupActions.addLine()),
				buttonDisabled: selectedPolygon.length !== 1,
				configElement: (
					<LinesConfig
						configuration={configuration}
						selectedPolygon={selectedPolygon}
					/>
				),
			},
			{
				title: 'Счетчики',
				buttonTitle: 'Новый счетчик',
				buttonAction: () => dispatch(markupActions.addCounter()),
				buttonDisabled: selectedPolygon.length !== 3,
				configElement: (
					<CounterConfig
						configuration={configuration}
						selectedPolygon={selectedPolygon}
					/>
				),
			},
		],
		[configuration, selectedPolygon, dispatch]
	)

	return (
		<div className={cls.zoneConfig}>
			<HStack className={cls.actions} gap='16'>
				<Button
					size='m'
					onClick={sendConfigurationHandler}
					disabled={status === 'loading'}
				>
					Сохранить
				</Button>
				<Button
					size='m'
					color='danger'
					onClick={() =>
						dispatch(markupActions.removeConfiguration())
					}
				>
					Удалить
				</Button>
			</HStack>
			{markupConfigBlocks.map(
				({
					buttonAction,
					buttonTitle,
					configElement,
					buttonDisabled,
					title,
				}) => (
					<div key={title} className={cls.block}>
						<Text
							className={cls.header}
							title={title}
							size='s'
							bold
						/>
						<Button
							size='s'
							onClick={buttonAction}
							className={cls.button}
							disabled={buttonDisabled}
						>
							{buttonTitle}
						</Button>
						<div className={cls.group}>{configElement}</div>
					</div>
				)
			)}
		</div>
	)
}
