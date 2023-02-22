import styles from './Settings.module.scss'

import Body from '../../ui/Tabs/Body'
import Block from '../../ui/Tabs/Block'
import CameraConfig from '../Config/CameraConfig'
import DatabaseConfig from '../Config/DatabaseConfig'
import DetectorConfig from '../Config/DetectorConfig'
import ZoneConfig from '../Config/ZoneConfig'
import Data from '../Data/Data'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import TabList from '../../ui/Tabs/TabList'
import Tab from '../../ui/Tabs/Tab'

const Tabs = () => {
	const { tab } = useTypedSelector(state => state.tabs)
	const { setTab } = useActions()

	return (
		<div className={styles.settings}>
			<TabList>
				<Tab active={tab === 'data'} onClick={() => setTab('data')}>
					Данные
				</Tab>
				<Tab
					active={tab === 'settings'}
					onClick={() => setTab('settings')}
				>
					Настройки
				</Tab>
				<Tab active={tab === 'shot'} onClick={() => setTab('shot')}>
					Стоп-кадр
				</Tab>
			</TabList>
			<Body show={tab === 'data'}>
				<Block header='Данные'>
					<Data />
				</Block>
			</Body>
			<Body show={tab === 'settings'}>
				<Block header='Настройки камеры'>
					<CameraConfig />
				</Block>
				<Block header='Настройки базы данных'>
					<DatabaseConfig />
				</Block>
				<Block header='Настройки детектора'>
					<DetectorConfig />
				</Block>
			</Body>
			<Body show={tab === 'shot'}>
				<Block header='Настройки зон детектирования'>
					<ZoneConfig />
				</Block>
			</Body>
		</div>
	)
}

export default Tabs
