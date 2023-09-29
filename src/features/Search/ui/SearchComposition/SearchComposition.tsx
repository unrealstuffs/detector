import { useRef } from "react"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { HStack } from "shared/ui/Stack/HStack/HStack"
import { useTypedSelector } from "shared/hooks/useTypedSelector"
import Select from "shared/ui/Select/Select"
import { getLineOptions } from "../../model/services/getLineOptions"
import { getDirectionsOptions } from "features/Search/model/services/getDirectionsOptions"
import { getVehiclesOptions } from "features/Search/model/services/getVehiclesOptions"
import { Input } from "shared/ui/Input/Input"
import { compositionActions } from "widgets/Data/model/slices/compositionSlice"
import { searchComposition } from "widgets/Data/model/api/searchComposition"
import SearchContainer from "../common/SearchContainer/SearchContainer"
import DatePickers from "../common/DatePickers/DatePickers"
import SearchFields from "../common/SearchFields/SearchFields"

export const SearchComposition = () => {
    const datePickersRef = useRef<{ clear: () => void }>()
    const { searchObject, status } = useTypedSelector(
        (state) => state.composition
    )
    const { configuration } = useTypedSelector((state) => state.markup)

    const dispatch = useAppDispatch()

    const resetSearchHandler = () => {
        if (datePickersRef.current) {
            datePickersRef.current.clear()
        }
        dispatch(compositionActions.resetData())
        dispatch(compositionActions.resetStatus())
        dispatch(compositionActions.resetBlockFetching())
        dispatch(compositionActions.resetSearchData())
    }

    const sendSearchHandler = () => {
        dispatch(searchComposition(searchObject))
    }

    return (
        <SearchContainer>
            <DatePickers
                disabled={status === "loading"}
                ref={datePickersRef}
                defaultDateFrom={searchObject.timestampRange.from}
                defaultDateTo={searchObject.timestampRange.to}
                resetSearchHandler={resetSearchHandler}
                searchHandler={sendSearchHandler}
                setTimestampFrom={(date) =>
                    dispatch(compositionActions.setTimestampRangeFrom(date))
                }
                setTimestampTo={(date) =>
                    dispatch(compositionActions.setTimestampRangeTo(date))
                }
            />
            <SearchFields>
                <Select
                    max
                    options={getLineOptions(configuration)}
                    onChange={(value) =>
                        dispatch(compositionActions.setLines(value))
                    }
                />
                <Select
                    max
                    options={getDirectionsOptions(configuration)}
                    onChange={(value) =>
                        dispatch(compositionActions.setDirections(value))
                    }
                />
                <Select
                    options={getVehiclesOptions()}
                    onChange={(value) =>
                        dispatch(compositionActions.setVehicleTypes(value))
                    }
                />
                <HStack gap="8" align="stretch">
                    <Input
                        size="s"
                        type="number"
                        placeholder="Количество..."
                        value={searchObject.quantity.value}
                        onChange={(value) =>
                            dispatch(compositionActions.setQuantityValue(value))
                        }
                    />
                    <Select
                        options={[
                            { title: "Больше", value: "more" },
                            { title: "Меньше", value: "less" },
                            { title: "Равно", value: "equal" },
                        ]}
                        onChange={(value) =>
                            dispatch(
                                compositionActions.setQuantityStatement(value)
                            )
                        }
                    />
                </HStack>
            </SearchFields>
        </SearchContainer>
    )
}
