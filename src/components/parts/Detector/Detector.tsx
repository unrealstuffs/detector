import { useState } from 'react'
import Shot from '../Shot/Shot'
import styles from './Detector.module.scss'
import Settings from '../../ui/Settings/Settings'
import SettingsBlock from '../../ui/Settings/SettingsBody'
import CameraConfig from '../Config/CameraConfig'
import DatabaseConfig from '../Config/DatabaseConfig'
import DetectorConfig from '../Config/DetectorConfig'
import ZoneConfig from '../Config/ZoneConfig'

const Detector = () => {
	const [isShot, setIsShot] = useState(false)

	return (
		<div className={styles.detector}>
			<Shot isShot={isShot} />
			<div className={styles.tabs}>
				<div className={styles.tabList}>
					<div
						className={`${styles.tab} ${!isShot && styles.active}`}
						onClick={() => {
							setIsShot(false)
						}}
					>
						Настройки
					</div>
					<div
						className={`${styles.tab} ${isShot && styles.active}`}
						onClick={() => {
							setIsShot(true)
						}}
					>
						Стоп-кадр
					</div>
				</div>
				<div className={`${styles.tabBody} ${!isShot && styles.show}`}>
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
				<div className={`${styles.tabBody} ${isShot && styles.show}`}>
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
