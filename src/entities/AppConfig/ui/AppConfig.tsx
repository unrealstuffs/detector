import { useEffect } from "react"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { getAppConfig } from "../model/services/getAppConfig"
import { useTypedSelector } from "shared/hooks/useTypedSelector"

export const AppConfig = () => {
    const dispatch = useAppDispatch()
    const { theme } = useTypedSelector((state) => state.theme)

    useEffect(() => {
        const loadConfig = async () => {
            await dispatch(getAppConfig())
        }

        loadConfig()
    }, [dispatch])

    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return null
}
