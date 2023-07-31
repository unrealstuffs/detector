import styles from './SideBar.module.scss'

import Camera from './components/Camera/Camera'
import Database from './components/Database/Database'
import Zones from './components/Zones/Zones'
import Data from '../Data/Data'
import { useTypedSelector } from '../../shared/hooks/useTypedSelector'
import { useActions } from '../../shared/hooks/useActions'
import TabList from '../../shared/ui/Tabs/TabList'
import Tab from '../../shared/ui/Tabs/Tab'
import Body from '../../shared/ui/Tabs/Body'
import Block from '../../shared/ui/Tabs/Block'

const SideBar = () => {
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
					<Camera />
				</Block>
				<Block header='Настройки базы данных'>
					<Database />
				</Block>
			</Body>
			<Body show={tab === 'shot'}>
				<Block header='Настройки зон детектирования'>
					<Zones />
				</Block>
			</Body>
		</div>
	)
}

export default SideBar
