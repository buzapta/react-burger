import { usersApi } from '../../utils/users-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked } from './reducers';
import { TUserRegisterApiReq, TLoginApiReq } from '@utils/types';

export const register = createAsyncThunk(
	'users/register',
	async (data: TUserRegisterApiReq) => {
		return usersApi.register(data);
	}
);

export const login = createAsyncThunk(
	'users/login',
	async (data: TLoginApiReq) => {
		return usersApi.login(data);
	}
);

export const updateUser = createAsyncThunk(
	'users/update',
	async (data: TUserRegisterApiReq) => {
		return usersApi.updateUser(data);
	}
);

export const logout = createAsyncThunk('users/logout', async () => {
	return usersApi.logout();
});

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
