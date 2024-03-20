import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const editLoginAndPassword = createAsyncThunk<any, void, ThunkConfig<any>>(
	'loginAndPassword/editLoginAndPassword',
	async (_, { getState, rejectWithValue }) => {
		const {
			user: { accessToken, login, newLogin, password, newPassword },
		} = getState()

		try {
			const response = await fetch(`${process.env.REACT_APP_CHANGE_LOGIN_PASSWORD}`, {
				method: 'PUT',
				body: JSON.stringify({
					login: login,
					password: password,
					new_login: newLogin,
					new_password: newPassword,
				}),
				headers: {
					Authorization: `${accessToken}`,
				},
			})
			const {
				result,
				meta: { message },
				data,
			} = await response.json()

			if (result === 'error') {
				return rejectWithValue(message)
			}

			return data
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('Unknown Error')
			}
		}
	}
)
