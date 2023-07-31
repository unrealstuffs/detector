import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai'

import styles from './styles.module.scss'

const NumInput = ({
	value,
	max,
	min,
	increment,
	bigIncrement,
	changeValue,
}: {
	value: number
	max: number
	min: number
	increment: number
	bigIncrement: number
	changeValue: (value: number) => void
}) => {
	const handleIncrement = () => {
		if (value <= max - increment) changeValue((value += increment))
	}

	const handleBigIncrement = () => {
		if (value <= max - bigIncrement) changeValue((value += bigIncrement))
	}

	const handleDecrement = () => {
		if (value >= min + increment) changeValue((value -= increment))
	}
	const handleBigDecrement = () => {
		if (value >= min + bigIncrement) changeValue((value -= bigIncrement))
	}

	return (
		<div className={styles.numInput}>
			<button onClick={handleBigDecrement}>
				<AiOutlineDoubleLeft />
			</button>
			<button onClick={handleDecrement}>
				<AiOutlineLeft />
			</button>
			<input
				type='text'
				max={max}
				min={min}
				value={value}
				onChange={e => {
					if (isNaN(+e.target.value)) {
						changeValue(0)
						return
					}
					if (+e.target.value < min) {
						changeValue(min)
						return
					}
					if (+e.target.value > max) {
						changeValue(max)
						return
					}
					changeValue(+e.target.value)
				}}
			/>
			<button onClick={handleIncrement}>
				<AiOutlineRight />
			</button>
			<button onClick={handleBigIncrement}>
				<AiOutlineDoubleRight />
			</button>
		</div>
	)
}

export default NumInput
