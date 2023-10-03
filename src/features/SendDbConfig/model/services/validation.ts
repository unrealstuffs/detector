export const validateField = (value: string) => {
    if (!value.length) {
        return false
    }

    return true
}

export const validateForm = (data: { [key: string]: boolean }) => {
    Object.keys(data).forEach((key) => {
        if (data[key]) {
            return false
        }
    })
    return true
}
