import { ReactNode, useState } from "react"
import { classNames } from "shared/lib/classNames"
import cls from "./DataContainer.module.scss"
import { HStack } from "shared/ui/Stack/HStack/HStack"
import { Text } from "shared/ui/Text/Text"
import { AiOutlineQuestionCircle, AiOutlineSearch } from "react-icons/ai"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { rowsCountOptions } from "../../../model/consts/rowsCountOptions"
import AppSelect from "shared/ui/AppSelect/AppSelect"

interface DataContainerProps {
    className?: string
    searchForm: ReactNode
    children: ReactNode
    title: string
    tooltipText: string
    tooltipId: string
    onChangeRowsCount: (value: number) => void
}

const DataContainer = (props: DataContainerProps) => {
    const {
        children,
        searchForm,
        title,
        tooltipId,
        tooltipText,
        className,
        onChangeRowsCount,
    } = props
    const [showForm, setShowForm] = useState(false)

    return (
        <div className={classNames(cls.DataContainer, {}, [className])}>
            <HStack align="center" gap="8" className={cls.header}>
                <Text title={title} size="s" bold />
                <AiOutlineQuestionCircle
                    className={cls.icon}
                    size={23}
                    id={tooltipId}
                />
                <Tooltip
                    anchorSelect={`#${tooltipId}`}
                    place="bottom"
                    content={tooltipText}
                    style={{ maxWidth: 400, zIndex: 999 }}
                />
            </HStack>
            <HStack
                align="center"
                justify="between"
                gap="8"
                className={cls.tools}
            >
                <AppSelect
                    options={rowsCountOptions}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: "#5BC4D1",
                        },
                    })}
                    placeholder="Показывать по 30 записей"
                    onChange={(value) => {
                        if (!value) return
                        const { value: newValue } = value
                        onChangeRowsCount(+newValue)
                    }}
                />
                <AiOutlineSearch
                    size={20}
                    className={classNames(
                        cls.searchIcon,
                        { [cls.active]: showForm },
                        [cls.icon]
                    )}
                    onClick={() => setShowForm(!showForm)}
                    style={{ cursor: "pointer" }}
                />
            </HStack>
            {showForm && searchForm}
            {children}
        </div>
    )
}

export default DataContainer
