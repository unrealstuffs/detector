import dayjs from 'dayjs'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Table from '../Table/Table'
import styles from './Data.module.scss'

const Data = () => {
	const {
		data: { composition, delay, intensity, plates, speed, types },
	} = useTypedSelector(state => state.data)

	return (
		<div className={styles.data}>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Распознанные ГРЗ</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'ГРЗ', accessor: 'licensePlate' },
					]}
					data={plates}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Классифицированные ТС</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'ТС', accessor: 'type' },
					]}
					data={types}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Интенсивность дорожного движения
				</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direct' },
						{ Header: 'Интенсивность', accessor: 'intensity' },
					]}
					data={intensity}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Состав транспортных средств
				</div>
				<Table
					columns={[
						{
							id: 'timestamp',
							Header: 'Время',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Тип ТС', accessor: 'vehicleType' },
						{ Header: 'Количество', accessor: 'quantity' },
					]}
					data={composition}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Средняя скорость движения ТС
				</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Средняя скорость', accessor: 'avgSpeed' },
					]}
					data={speed}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Плотность движения</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY hh:mm:ss'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Средняя плотность', accessor: 'avgDelay' },
					]}
					data={delay}
				/>
			</div>
		</div>
	)
}

export default Data
