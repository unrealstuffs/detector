import { classNames } from "shared/lib/classNames"
import cls from "./Range.module.scss"
import { HStack } from "../Stack/HStack/HStack"
import { Text } from "../Text/Text"

interface RangeProps {
    className?: string
    value: number
    min: number
    max: number
    label: string
    onChange: (value: number) => void
}

const Range = (props: RangeProps) => {
    const { className, value, min, max, label, onChange } = props

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        onChange?.(+e.target.value)
    }

    return (
        <div className={classNames(cls.container, {}, [className])}>
            <Text className={cls.label} text={label} bold size="s" />
            <input
                className={cls.input}
                type="range"
                value={value}
                max={max}
                min={min}
                step={1}
                onChange={onChangeHandler}
            />
            <HStack align="center" justify="between" className={cls.values}>
                <span>{min}</span>
                <span>{value}</span>
                <span>{max}</span>
            </HStack>
        </div>
    )
}

export default Range
