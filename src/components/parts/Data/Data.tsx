import dayjs from 'dayjs'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Table from '../Table/Table'
import styles from './Data.module.scss'

const Data = () => {
	const {
		data: { composition, delay, intensity, speed, types, density },
	} = useTypedSelector(state => state.data)
	const { configuration } = useTypedSelector(state => state.detector)

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
						{
							Header: 'ГРЗ',
							accessor: (d: any) => {
								if (d.licencePlate) {
									return d.linencePlate
										.replace(/!/g, ' ')
										.slice(0, -2)
								} else {
									return d.linencePlate
								}
							},
						},
						{
							Header: 'ТС',
							accessor: 'type',
						},
						{
							Header: 'Направление',
							accessor: (d: any) => {
								if (
									configuration[d.direction].reverseDirection
								) {
									return 'Обратное'
								} else {
									return 'Прямое'
								}
							},
						},
						{
							Header: 'Полоса',
							accessor: (d: any) => {
								if (d.line) {
									let lineArray = d.line.split('_')
									let lineName = `l-${++lineArray[1]}`
									return lineName
								} else {
									return d.line
								}
							},
						},
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
						{
							Header: 'Направление',
							accessor: (d: any) => {
								if (
									configuration[d.direction].reverseDirection
								) {
									return 'Обратное'
								} else {
									return 'Прямое'
								}
							},
						},
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
						{
							Header: 'Направление',
							accessor: (d: any) => {
								if (
									configuration[d.direction].reverseDirection
								) {
									return 'Обратное'
								} else {
									return 'Прямое'
								}
							},
						},
						{ Header: 'Полоса', accessor: 'line' },
						{
							Header: 'Тип ТС',
							accessor: 'vehicleType',
						},
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
						{
							Header: 'Направление',
							accessor: (d: any) => {
								if (
									configuration[d.direction].reverseDirection
								) {
									return 'Обратное'
								} else {
									return 'Прямое'
								}
							},
						},
						{ Header: 'Полоса', accessor: 'line' },
						{ Header: 'Средняя скорость', accessor: 'avgSpeed' },
					]}
					data={speed}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Средние задержки</div>
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
						{
							Header: 'Направление',
							accessor: (d: any) => {
								if (
									configuration[d.direction].reverseDirection
								) {
									return 'Обратное'
								} else {
									return 'Прямое'
								}
							},
						},
						{ Header: 'Полоса', accessor: 'line' },
						{ Header: 'Средняя задержка', accessor: 'avgDelay' },
					]}
					data={delay}
				/>
			</div>
			<div className={styles.dataBlock}>
				<div className={styles.dataHeader}>Средняя плотность</div>
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
						{ Header: 'Средняя плотность', accessor: 'density' },
					]}
					data={density}
				/>
			</div>
		</div>
	)
}

export default Data
