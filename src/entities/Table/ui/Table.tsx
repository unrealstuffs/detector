import cls from "./Table.module.scss"
import { useTable, useSortBy, Column } from "react-table"
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"
import { FetchStatus } from "shared/types/FetchStatus"
import { classNames } from "shared/lib/classNames"

interface TableProps {
    columns: Array<Column<object>>
    data: Array<object>
    rowsCount: number
    status: FetchStatus
    className?: string
}

export const Table = (props: TableProps) => {
    const { columns, data, rowsCount, status, className } = props
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
                initialState: {
                    sortBy: [
                        {
                            id: "timestamp",
                            desc: false,
                        },
                        {
                            id: "timestampRange",
                            desc: false,
                        },
                    ],
                },
            },
            useSortBy
        )

    const pageRows = rows.slice(0, rowsCount)

    return (
        <div className={cls.Container}>
            <table
                {...getTableProps()}
                className={classNames(cls.table, {}, [className])}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <AiOutlineCaretDown
                                                    size={10}
                                                    className={cls.icon}
                                                />
                                            ) : (
                                                <AiOutlineCaretUp
                                                    size={10}
                                                    className={cls.icon}
                                                />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {pageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className={
                                                cell.value
                                                    ? cls.value
                                                    : cls.muted
                                            }
                                        >
                                            {cell.value
                                                ? cell.render("Cell")
                                                : "Не опознано"}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    {status !== "success" && !pageRows.length && (
                        <tr>
                            <td
                                className={cls.placeholder}
                                colSpan={columns.length}
                                style={{ textAlign: "center" }}
                            >
                                {status === "init" && "Нет данных"}
                                {status === "error" && "Ошибка сервера"}
                                {status === "loading" && "Загрузка"}
                                {status === "nodata" && "Не найдено"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
