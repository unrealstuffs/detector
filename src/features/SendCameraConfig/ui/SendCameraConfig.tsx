import { toast } from "react-hot-toast"
import { useTypedSelector } from "shared/hooks/useTypedSelector"
import Button from "shared/ui/Button/Button"
import { sendCameraConfig } from "../model/services/sendCameraConfig"
import { cameraActions } from "../model/slices/cameraSlice"
import cls from "./SendCameraConfig.module.scss"
import { classNames } from "shared/lib/classNames"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import Checkbox from "shared/ui/Checkbox/Checkbox"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { VStack } from "shared/ui/Stack/VStack/VStack"
import { HStack } from "shared/ui/Stack/HStack/HStack"
import { Text } from "shared/ui/Text/Text"
import { sendRestartCamera } from "../model/services/sendRestartCamera"
import NumInput from "shared/ui/NumInput/NumInput"
import { getCameraConfig } from "../model/services/getCameraConfig"
import Range from "shared/ui/Range/Range"

export const SendCameraConfig = () => {
    const { cameraConfig, status } = useTypedSelector((state) => state.camera)
    const { servoSettings, focusAndZoomByStep, restartCamera } =
        useTypedSelector((state) => state.appConfig)

    const dispatch = useAppDispatch()

    const sendCameraConfigHandler = async () => {
        const result = await dispatch(sendCameraConfig())
        if (sendCameraConfig.fulfilled.match(result)) {
            toast.success("Отправлено!")
            await dispatch(getCameraConfig())
        } else {
            if (result.payload) {
                toast.error(`Ошибка отправки данных: ${result.payload}`)
            }
        }
    }

    const sendRestartCameraHandler = async () => {
        const result = await dispatch(sendRestartCamera())
        if (sendRestartCamera.fulfilled.match(result)) {
            toast.success("Отправлено!")
        } else {
            if (result.payload) {
                toast.error(`Ошибка отправки данных: ${result.payload}`)
            }
        }
    }

    return (
        <div className={classNames(cls.config, {}, [cls.cameraConfig])}>
            <div className={cls.configBody}>
                <Checkbox
                    label="Инфракрасный фильтр"
                    checked={cameraConfig.filter}
                    onChange={(checked) =>
                        dispatch(cameraActions.setFilter(checked))
                    }
                />
                <div></div>

                {servoSettings ? (
                    <Range
                        max={95}
                        min={85}
                        value={cameraConfig.servoX}
                        label="Параметры сервопривода Х (°)"
                        onChange={(value) =>
                            dispatch(cameraActions.setServoX(value))
                        }
                    />
                ) : (
                    <div></div>
                )}

                {servoSettings ? (
                    <Range
                        max={95}
                        min={85}
                        value={cameraConfig.servoY}
                        label="Параметры сервопривода Y (°)"
                        onChange={(value) =>
                            dispatch(cameraActions.setServoY(value))
                        }
                    />
                ) : (
                    // <NumInput
                    // 	label='Параметры сервопривода Y(°)'
                    // 	value={cameraConfig.servoY}
                    // 	increment={1}
                    // 	bigIncrement={5}
                    // 	max={95}
                    // 	min={85}
                    // 	onChange={value => dispatch(cameraActions.setServoY(value))}
                    // />
                    <div></div>
                )}

                {!focusAndZoomByStep ? (
                    <NumInput
                        label="Параметры зума"
                        value={
                            typeof cameraConfig.zoom === "number"
                                ? cameraConfig.zoom
                                : 0
                        }
                        increment={100}
                        bigIncrement={1000}
                        max={20000}
                        min={0}
                        onChange={(value) =>
                            dispatch(cameraActions.setZoom(value))
                        }
                    />
                ) : (
                    <VStack gap="8">
                        <Text text="Параметры зума" bold size="s"></Text>
                        <HStack gap="8" className={cls.zoomConrols}>
                            <AiOutlineLeft
                                onClick={() => {
                                    if (cameraConfig.zoom === "PREV") {
                                        dispatch(cameraActions.setZoom(null))
                                    } else {
                                        dispatch(cameraActions.setZoom("PREV"))
                                    }
                                }}
                                className={classNames(
                                    cls.icon,
                                    {
                                        [cls.active]:
                                            cameraConfig.zoom === "PREV",
                                    },
                                    []
                                )}
                            />
                            <AiOutlineRight
                                onClick={() => {
                                    if (cameraConfig.zoom === "NEXT") {
                                        dispatch(cameraActions.setZoom(null))
                                    } else {
                                        dispatch(cameraActions.setZoom("NEXT"))
                                    }
                                }}
                                className={classNames(
                                    cls.icon,
                                    {
                                        [cls.active]:
                                            cameraConfig.zoom === "NEXT",
                                    },
                                    []
                                )}
                            />
                        </HStack>
                        <Text
                            text={`Текущий пресет: ${
                                cameraConfig.zoomPreset.current === -1
                                    ? "не определен"
                                    : cameraConfig.zoomPreset.current
                            }`}
                            bold
                            size="s"
                        ></Text>
                        <Text
                            text={`Количество пресетов: ${
                                cameraConfig.zoomPreset.max_preset === -1
                                    ? "не определено"
                                    : cameraConfig.zoomPreset.max_preset
                            }`}
                            bold
                            size="s"
                        ></Text>
                    </VStack>
                )}

                {!focusAndZoomByStep ? (
                    <NumInput
                        label="Параметры фокуса"
                        value={
                            typeof cameraConfig.focus === "number"
                                ? cameraConfig.focus
                                : 0
                        }
                        increment={100}
                        bigIncrement={1000}
                        max={20000}
                        min={0}
                        onChange={(value) =>
                            dispatch(cameraActions.setFocus(value))
                        }
                    />
                ) : (
                    <VStack gap="8">
                        <Text text="Параметры фокуса" bold size="s"></Text>
                        <HStack gap="8">
                            <AiOutlineLeft
                                onClick={() => {
                                    if (cameraConfig.focus === "STEP_M") {
                                        dispatch(cameraActions.setFocus(null))
                                    } else {
                                        dispatch(
                                            cameraActions.setFocus("STEP_M")
                                        )
                                    }
                                }}
                                className={classNames(
                                    cls.icon,
                                    {
                                        [cls.active]:
                                            cameraConfig.focus === "STEP_M",
                                    },
                                    []
                                )}
                            />
                            <AiOutlineRight
                                onClick={() => {
                                    if (cameraConfig.focus === "STEP_P") {
                                        dispatch(cameraActions.setFocus(null))
                                    } else {
                                        dispatch(
                                            cameraActions.setFocus("STEP_P")
                                        )
                                    }
                                }}
                                className={classNames(
                                    cls.icon,
                                    {
                                        [cls.active]:
                                            cameraConfig.focus === "STEP_P",
                                    },
                                    []
                                )}
                            />
                        </HStack>
                    </VStack>
                )}
            </div>
            <HStack gap="12">
                <Button
                    disabled={status === "loading"}
                    onClick={sendCameraConfigHandler}
                    size="m"
                >
                    Сохранить
                </Button>
                {restartCamera && (
                    <Button
                        disabled={status === "loading"}
                        color="transparent"
                        onClick={sendRestartCameraHandler}
                        size="m"
                    >
                        Перезагрузить камеру
                    </Button>
                )}
            </HStack>
        </div>
    )
}
