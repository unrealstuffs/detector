import Select, { GroupBase, Props } from "react-select"
import cls from "./AppSelect.module.scss"
import { classNames } from "shared/lib/classNames"

const AppSelect = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: Props<Option, IsMulti, Group>
) => {
    return (
        <Select
            className={cls.select}
            classNames={{
                control: () => cls.control,
                menu: () => cls.menu,
                singleValue: () => cls.value,
                option: ({ isSelected }) =>
                    classNames(cls.option, { [cls.selected]: isSelected }),
                placeholder: () => cls.placeholder,
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: "#5BC4D1",
                },
            })}
            noOptionsMessage={() => "Нет данных"}
            {...props}
        />
    )
}

export default AppSelect
