import { useAppDispatch } from "shared/hooks/useAppDispatch"
import Checkbox from "shared/ui/Checkbox/Checkbox"
import { themeActions } from "../model/slices/theme"
import { useTypedSelector } from "shared/hooks/useTypedSelector"

export const ToggleTheme = () => {
    const dispatch = useAppDispatch()
    const { theme } = useTypedSelector((state) => state.theme)

    const handleToggleTheme = (value: boolean) => {
        dispatch(themeActions.toggleTheme(value ? "dark" : "light"))
    }

    return (
        <Checkbox
            checked={theme === "dark"}
            label="Темная тема"
            reverse
            onChange={(value) => handleToggleTheme(value)}
        />
    )
}
