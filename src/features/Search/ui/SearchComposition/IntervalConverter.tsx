import { useState, useEffect } from "react"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { compositionActions } from "widgets/Data"
import { Input } from "shared/ui/Input/Input"
import Select from "shared/ui/Select/Select"

type UnitsType = "seconds" | "minutes" | "hours" | "days"

const IntervalConverter = () => {
    const [value, setValue] = useState<string>("")
    const [unit, setUnit] = useState<UnitsType>("seconds")
    const [convertedValue, setConvertedValue] = useState<number>(0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(compositionActions.setInterval(convertedValue))
    }, [convertedValue])

    const convertToSeconds = (value: number, unit: UnitsType): number => {
        let seconds: number = 0
        switch (unit) {
            case "days":
                seconds = value * 24 * 60 * 60
                break
            case "hours":
                seconds = value * 60 * 60
                break
            case "minutes":
                seconds = value * 60
                break
            default:
                seconds = value
                break
        }

        return seconds
    }

    const handleInputChange = (value: string) => {
        const newValue = parseInt(value)
        setValue(value)
        setConvertedValue(convertToSeconds(newValue, unit))
    }

    const handleSelectChange = (selectedValue: string) => {
        const newUnit = selectedValue as UnitsType
        setUnit(newUnit)
        setConvertedValue(convertToSeconds(+value, newUnit))
    }

    return (
        <>
            <Input
                size="s"
                type="number"
                placeholder="Интервал..."
                value={value}
                onChange={handleInputChange}
            />
            <Select
                defaultValue={unit}
                options={[
                    { title: "Секунд", value: "seconds" },
                    { title: "Минут", value: "minutes" },
                    { title: "Часов", value: "hours" },
                    { title: "Дней", value: "days" },
                ]}
                onChange={handleSelectChange}
            />
        </>
    )
}

export default IntervalConverter
