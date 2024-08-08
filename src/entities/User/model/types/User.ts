type Roles = "admin" | "user"

export interface User {
    accessToken: string | null
    login: string
    password: string
    role: Roles
}
