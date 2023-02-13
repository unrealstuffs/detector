import dayjs from 'dayjs'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Table from '../Table/Table'
import styles from './Data.module.scss'

const Data = () => {
	const {
		data: { composition, delay, intensity, speed, types },
	} = useTypedSelector(state => state.data)

	return (
		<div className={styles.data}>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>
					Распознанные ГРЗ и классифицированные ТС
				</div>
				<Table
					columns={[
						{
							Header: 'Время',
							id: 'timestamp',
							accessor: (d: any) => {
								return dayjs(d.timestamp).format(
									'DD/MM/YY HH:mm'
								)
							},
						},
						{ Header: 'ГРЗ', accessor: 'licensePlate' },
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
									'DD/MM/YY HH:mm'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Полоса', accessor: 'line' },
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
									'DD/MM/YY HH:mm'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Полоса', accessor: 'line' },
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
									'DD/MM/YY HH:mm'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Полоса', accessor: 'line' },
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
									'DD/MM/YY HH:mm'
								)
							},
						},
						{ Header: 'Направление', accessor: 'direction' },
						{ Header: 'Полоса', accessor: 'line' },
						{ Header: 'Средняя плотность', accessor: 'avgDelay' },
					]}
					data={delay}
				/>
			</div>
		</div>
	)
}

export default Data
