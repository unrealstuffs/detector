import { classNames } from "shared/lib/classNames"
import { useTypedSelector } from "shared/hooks/useTypedSelector"
import Button from "shared/ui/Button/Button"
import cls from "./EditLoginAndPassword.module.scss"
import { Input } from "shared/ui/Input/Input"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { toast } from "react-hot-toast"
import { HStack } from "shared/ui/Stack/HStack/HStack"
import { editLoginAndPassword } from "../model/services/editLoginAndPassword"
import { Text } from "shared/ui/Text/Text"
import { userActions } from "entities/User"

interface SendDbConfigProps {
    className?: string
}

export const EditLoginAndPassword = (props: SendDbConfigProps) => {
    const { className } = props
    const { login, newLogin, password, newPassword, status } = useTypedSelector(
        (state) => state.user
    )

    const dispatch = useAppDispatch()

    const validateFields = () => {
        let errorMessage = ""

        if (!login) {
            errorMessage = "Текущий логин не указан"
        } else if (!password) {
            errorMessage = "Текущий пароль не введен"
        }

        if (errorMessage) {
            toast.error(errorMessage)
            return false
        }

        return true
    }

    const sendDatabaseConfigHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        if (!validateFields()) {
            return
        }

        const resultAction = await dispatch(editLoginAndPassword())

        if (editLoginAndPassword.fulfilled.match(resultAction)) {
            toast.success("Обновлено")
        } else {
            toast.error(`Ошибка: ${resultAction.payload}`)
        }
    }

    return (
        <div className={classNames(cls.config, {}, [className])}>
            <form onSubmit={sendDatabaseConfigHandler}>
                <Text
                    className={cls.subtitle}
                    title={"Смена логина и пароля"}
                    size="s"
                    bold
                />
                <div className={cls.block}>
                    <Input
                        label="Текущий логин"
                        type="text"
                        value={login}
                        required
                        onChange={(value) => {
                            dispatch(userActions.setLogin(value))
                        }}
                    />
                    <Input
                        label="Новый логин"
                        type="text"
                        value={newLogin}
                        onChange={(value) => {
                            dispatch(userActions.setNewLogin(value))
                        }}
                    />
                </div>
                {/* <Text className={cls.subtitle} title={'Смена пароля'} size='s' bold /> */}
                <div className={cls.block}>
                    <Input
                        label="Текущий пароль"
                        required
                        type="password"
                        value={password}
                        onChange={(value) =>
                            dispatch(userActions.setPassword(value))
                        }
                    />
                    <Input
                        label="Новый пароль"
                        type="password"
                        value={newPassword}
                        onChange={(value) =>
                            dispatch(userActions.setNewPassword(value))
                        }
                    />
                </div>

                <HStack gap="12" align="center">
                    <Button
                        disabled={status === "loading"}
                        size="m"
                        type="submit"
                    >
                        Сохранить
                    </Button>
                </HStack>
            </form>
        </div>
    )
}
