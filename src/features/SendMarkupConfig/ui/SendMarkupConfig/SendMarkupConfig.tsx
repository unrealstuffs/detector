import styles from './SendMarkupConfig.module.scss'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { AppDispatch } from 'app/store'
import Button from 'shared/ui/Button/Button'
import { sendConfiguration } from '../../model/services/sendConfiguration'
import { markupActions } from '../../model/slices/markupSlice'
import ZonesConfig from '../ZonesConfig/ZonesConfig'
import { Text } from 'shared/ui/Text/Text'
import LinesConfig from '../LinesConfig/LinesConfig'
import CounterConfig from '../CounterConfig/CounterConfig'

export const SendMarkupConfig = () => {
	const { configuration, selectedPolygon, status } = useTypedSelector(
		state => state.markup
	)
	const dispatch = useDispatch<AppDispatch>()
	const [showConfig, setShowConfig] = useState(false)

	const sendConfigurationHandler = async () => {
		await dispatch(sendConfiguration())
	}

	return (
		<div className={styles.zoneConfig}>
			<div className={styles.zoneActions}>
				<Button
					size='m'
					onClick={sendConfigurationHandler}
					disabled={status !== 'init'}
				>
					{status === 'init' && 'Сохранить'}
					{status === 'error' && 'Ошибка'}
					{status === 'loading' && 'Загрузка...'}
					{status === 'success' && 'Отправлено!'}
				</Button>
				<Button
					size='m'
					onClick={() => markupActions.removeConfiguration()}
				>
					Удалить
				</Button>
			</div>
			<div className={styles.zoneBlock}>
				<Text className={styles.zoneHeader} title='Зоны' size='s' />
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='s'
							onClick={() => markupActions.addZone()}
						>
							Новая зона
						</Button>
					</div>
					<div className={styles.inputGroup}>
						<ZonesConfig
							configuration={configuration}
							selectedPolygon={selectedPolygon}
						/>
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<Text className={styles.zoneHeader} title='Полосы' size='s' />
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='s'
							disabled={selectedPolygon.length !== 1}
							onClick={() => markupActions.addLine()}
						>
							Новая полоса
						</Button>
					</div>
					<div className={styles.inputGroup}>
						<LinesConfig
							configuration={configuration}
							selectedPolygon={selectedPolygon}
						/>
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<Text className={styles.zoneHeader} title='Счетчики' size='s' />
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='s'
							disabled={selectedPolygon.length !== 3}
							onClick={() => markupActions.addCounter()}
						>
							Новый счетчик
						</Button>
					</div>
					<div className={styles.inputGroup}>
						<CounterConfig
							configuration={configuration}
							selectedPolygon={selectedPolygon}
						/>
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<Text
					className={styles.zoneHeader}
					title='Конфигурация'
					size='s'
				/>
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='s'
							onClick={() => setShowConfig(!showConfig)}
						>
							Конфигурация
						</Button>
					</div>
					<div className={styles.config}>
						{showConfig && (
							<pre>{JSON.stringify(configuration, null, 4)}</pre>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
