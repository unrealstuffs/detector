import styles from './Select.module.scss'

interface IOptions {
	options: { value: string; title: string }[]
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ options, onChange }: IOptions) => {
	return (
		<select className={styles.select} onChange={onChange}>
			{options.map(item => (
				<option value={item.value}>{item.title}</option>
			))}
		</select>
	)
}

export default Select
