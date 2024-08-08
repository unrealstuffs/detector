import { Toaster } from "react-hot-toast"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import cls from "./AppToaster.module.scss"

export const AppToaster = () => {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                className: cls.toaster,
                error: {
                    icon: <AiOutlineClose size={20} className={cls.error} />,
                },
                success: {
                    icon: <AiOutlineCheck size={20} className={cls.success} />,
                },
            }}
        />
    )
}
