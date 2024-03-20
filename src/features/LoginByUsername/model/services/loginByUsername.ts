import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

interface LoginProps {
	login: string
	password: string
}

export const loginByUsername = createAsyncThunk<any, LoginProps, ThunkConfig<any>>(
	'user/loginByUsername',
	async (_, { getState, rejectWithValue }) => {
		const {
			user: { login, password },
		} = getState()

		const isDev = process.env.NODE_ENV === 'development'
		if (isDev) {
			return {
				accessToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImR0bSJ9.yFubHXiWPxNy-NwozAgjprns4YQ250kucjtwZhO7EXE',
			}
		}
		try {
			const response = await fetch(`${process.env.REACT_APP_AUTH_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ login, password }),
			})
			const {
				result,
				meta: { message },
			} = await response.json()

			if (result === 'error') {
				return rejectWithValue(message)
			}

			return {
				accessToken: response.headers.get('Authorization') || '',
			}
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('Unknown Error')
			}
		}
	}
)
