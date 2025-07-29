import { usersApi } from '../../utils/users-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked } from './reducers';

export const register = createAsyncThunk(
	'users/register',
	async (data, { dispatch }) => {
		usersApi
			.register(data)
			.then((userResponse) => dispatch(setUser(userResponse.user)));
	}
);

export const login = createAsyncThunk(
	'users/login',
	async (data, { dispatch }) => {
		usersApi
			.login(data)
			.then((userResponse) => dispatch(setUser(userResponse.user)));
	}
);

export const updateUser = createAsyncThunk(
	'users/update',
	async (data, { dispatch }) => {
		usersApi
			.updateUser(data)
			.then((userResponse) => dispatch(setUser(userResponse.user)));
	}
);

export const logout = createAsyncThunk(
	'users/logout',
	async (_, { dispatch }) => {
		usersApi.logout(null).then(dispatch(setUser(null)));
	}
);

export const checkUserAuth = createAsyncThunk(
	'users/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			usersApi
				.getUser()
				.then((userResponse) => {
					dispatch(setUser(userResponse.user));
				})
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
