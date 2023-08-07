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
			accessToken: 'test_token',
		}
	}
	try {
		const response = await fetch(`${process.env.REACT_APP_AUTH_URL}`, {
			method: 'PUT',
			body: JSON.stringify({ login, password }),
		})
		const data = await response.json()

		if (data.result === 'success') {
			return {
				user: data.data || '',
				accessToken: response.headers.get('Authorization') || '',
			}
		}

		return {
			user: null,
			accessToken: null,
		}
	} catch {
		return rejectWithValue('error')
	}
})
