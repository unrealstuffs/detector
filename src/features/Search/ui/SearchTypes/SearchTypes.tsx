import { useRef } from "react"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { typesActions } from "widgets/Data"
import { searchTypes } from "widgets/Data/model/api/searchTypes"
import { useTypedSelector } from "shared/hooks/useTypedSelector"
import Select from "shared/ui/Select/Select"
import { getLineOptions } from "../../model/services/getLineOptions"
import { getDirectionsOptions } from "features/Search/model/services/getDirectionsOptions"
import { getVehiclesOptions } from "features/Search/model/services/getVehiclesOptions"
import DatePickers from "../common/DatePickers/DatePickers"
import SearchContainer from "../common/SearchContainer/SearchContainer"
import SearchFields from "../common/SearchFields/SearchFields"
import LicensePlatesInputs from "./LicensePlatesInputs"
import { HStack } from "shared/ui/Stack/HStack/HStack"
import { Input } from "shared/ui/Input/Input"

export const SearchTypes = () => {
    const datePickersRef = useRef<{ clear: () => void }>()
    const { searchObject, status } = useTypedSelector((state) => state.types)
    const { configuration } = useTypedSelector((state) => state.markup)

    const dispatch = useAppDispatch()

    const resetSearchHandler = () => {
        if (datePickersRef.current) {
            datePickersRef.current.clear()
        }
        dispatch(typesActions.resetBlockFetching())
        dispatch(typesActions.resetStatus())
        dispatch(typesActions.resetData())
        dispatch(typesActions.resetSearchData())
    }

    const sendSearchHandler = () => {
        dispatch(searchTypes(searchObject))
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
                    dispatch(typesActions.setTimestampRangeFrom(date))
                }
                setTimestampTo={(date) =>
                    dispatch(typesActions.setTimestampRangeTo(date))
                }
            />
            <SearchFields>
                <HStack gap="8" align="stretch">
                    <Select
                        max
                        options={getLineOptions(configuration)}
                        onChange={(value) =>
                            dispatch(typesActions.setLines(value))
                        }
                    />
                    <Select
                        max
                        options={getDirectionsOptions(configuration)}
                        onChange={(value) =>
                            dispatch(typesActions.setDirections(value))
                        }
                    />
                </HStack>
                <HStack gap="8" align="stretch">
                    <Input
                        size="s"
                        placeholder="Цвет машины"
                        value={searchObject.colors[0]}
                        onChange={(value) =>
                            dispatch(typesActions.setColors(value))
                        }
                    />
                    <Input
                        size="s"
                        placeholder="Марка машины"
                        value={searchObject.vehicle_makes[0]}
                        onChange={(value) =>
                            dispatch(typesActions.setVehicleMakes(value))
                        }
                    />
                </HStack>
                <Select
                    options={getVehiclesOptions()}
                    onChange={(value) =>
                        dispatch(typesActions.setVehicleTypes(value))
                    }
                />
                <LicensePlatesInputs />
            </SearchFields>
        </SearchContainer>
    )
}
