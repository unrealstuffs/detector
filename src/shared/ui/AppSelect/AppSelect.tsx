import Select, { GroupBase, Props } from 'react-select'

const AppSelect = <
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(
	props: Props<Option, IsMulti, Group>
) => {
	return (
		<Select
			theme={theme => ({
				...theme,
				colors: {
					...theme.colors,
					primary: '#5BC4D1',
				},
			})}
			noOptionsMessage={() => 'Нет данных'}
			{...props}
		/>
	)
}

export default AppSelect
