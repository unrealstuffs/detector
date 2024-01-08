import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { User } from 'entities/User/model/types/User'

interface LoginProps {
	login: string
	password: string
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginProps,
	ThunkConfig<string>
>('user/loginByUsername', async ({ login, password }, { rejectWithValue }) => {
	const isDev = process.env.NODE_ENV === 'development'
	if (isDev) {
		return {
			user: 'user',
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
			data,
			result,
			meta: { message },
		} = await response.json()

		if (result === 'error') {
			return rejectWithValue(message)
		}

		return {
			user: data.data || '',
			accessToken: response.headers.get('Authorization') || '',
		}
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message)
		} else {
			return rejectWithValue('Unknown Error')
		}
	}
})
