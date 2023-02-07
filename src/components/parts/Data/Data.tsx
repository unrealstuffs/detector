import { AiOutlineFilter } from 'react-icons/ai'
import styles from './Data.module.scss'

const Data = () => {
	return (
		<div className={styles.data}>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Распознанные ГРЗ</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>Знак 1</span>
					<span>Знак 2</span>
					<span>Знак 3</span>
					<span>Знак 4</span>
				</div>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Классифицированные ТС</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>ТС 1</span>
					<span>ТС 2</span>
					<span>ТС 3</span>
					<span>ТС 4</span>
				</div>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Интенсивность дорожного движения
				</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>ТС 1</span>
					<span>ТС 2</span>
					<span>ТС 3</span>
					<span>ТС 4</span>
				</div>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Состав транспортных средств
				</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>ТС 1</span>
					<span>ТС 2</span>
					<span>ТС 3</span>
					<span>ТС 4</span>
				</div>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Средняя скорость движения ТС
				</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>ТС 1</span>
					<span>ТС 2</span>
					<span>ТС 3</span>
					<span>ТС 4</span>
				</div>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Плотность движения</div>
				<div className={styles.inputGroup}>
					<input type='text' placeholder='Поиск...' />
					<AiOutlineFilter size={30} className={styles.icon} />
				</div>
				<div className={styles.dataBody}>
					<span>ТС 1</span>
					<span>ТС 2</span>
					<span>ТС 3</span>
					<span>ТС 4</span>
				</div>
			</div>
		</div>
	)
}

export default Data
