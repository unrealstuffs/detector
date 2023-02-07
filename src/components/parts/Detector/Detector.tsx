import { useState } from 'react'
import Shot from '../Shot/Shot'
import styles from './Detector.module.scss'
import Settings from '../../ui/Settings/Settings'
import SettingsBlock from '../../ui/Settings/SettingsBody'
import CameraConfig from '../Config/CameraConfig'
import DatabaseConfig from '../Config/DatabaseConfig'
import DetectorConfig from '../Config/DetectorConfig'
import ZoneConfig from '../Config/ZoneConfig'
import Data from '../Data/Data'

const Detector = () => {
	const [tab, setTab] = useState<'data' | 'settings' | 'shot'>('data')

	return (
		<div className={styles.detector}>
			<Shot isShot={tab === 'shot'} />
			<div className={styles.tabs}>
				<div className={styles.tabList}>
					<div
						className={`${styles.tab} ${
							tab === 'data' && styles.active
						}`}
						onClick={() => {
							setTab('data')
						}}
					>
						Данные
					</div>
					<div
						className={`${styles.tab} ${
							tab === 'settings' && styles.active
						}`}
						onClick={() => {
							setTab('settings')
						}}
					>
						Настройки
					</div>
					<div
						className={`${styles.tab} ${
							tab === 'shot' && styles.active
						}`}
						onClick={() => {
							setTab('shot')
						}}
					>
						Стоп-кадр
					</div>
				</div>
				<div
					className={`${styles.tabBody} ${
						tab === 'data' && styles.show
					}`}
				>
					<Settings>
						<SettingsBlock header='Данные'>
							<Data />
						</SettingsBlock>
					</Settings>
				</div>
				<div
					className={`${styles.tabBody} ${
						tab === 'settings' && styles.show
					}`}
				>
					<Settings>
						<SettingsBlock header='Настройки камеры'>
							<CameraConfig />
						</SettingsBlock>
						<SettingsBlock header='Настройки базы данных'>
							<DatabaseConfig />
						</SettingsBlock>
						<SettingsBlock header='Настройки детектора'>
							<DetectorConfig />
						</SettingsBlock>
					</Settings>
				</div>
				<div
					className={`${styles.tabBody} ${
						tab === 'shot' && styles.show
					}`}
				>
					<Settings>
						<SettingsBlock header='Настройки зон детектирования'>
							<ZoneConfig />
						</SettingsBlock>
					</Settings>
				</div>
			</div>
		</div>
	)
}

export default Detector
