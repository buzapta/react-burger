import { getResponse } from './api';
import {
	TForgotPasswordApiReq,
	TPasswordApiRes,
	TResetPasswordApiReq,
	TUserRegisterApiReq,
	TUserApiRes,
	TRegisterApiRes,
	TLoginApiReq,
	TLogoutApiReq,
	TUserUpdateApiReq,
	TUserUpdateApiRes,
	TTokenRefreshApiReq,
} from '@utils/types';

const usersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

const setToken = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const removeToken = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

const getResponseWithSetToken = async <T extends TUserApiRes>(
	res: Response
): Promise<T> => {
	try {
		return await getResponse<T>(res).then((response) => {
			setToken(response.accessToken, response.refreshToken);
			return response;
		});
	} catch (error) {
		removeToken();
		return Promise.reject(error);
	}
};

const register = async (data: TUserRegisterApiReq) => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/register`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	});
	return getResponseWithSetToken<TRegisterApiRes>(res);
};

const login = async (data: TLoginApiReq) => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/login`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	});
	return getResponseWithSetToken<TUserApiRes>(res);
};

const logout = async () => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/logout`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});
	removeToken();
	return getResponse<TLogoutApiReq>(res);
};

const getUser = async (): Promise<TUserApiRes | Error> => {
	return await fetchWithRefresh<TUserApiRes>(
		`${usersApiConfig.baseUrl}/auth/user`,
		{
			method: 'GET',
			// @ts-expect-error "sprint5"
			headers: {
				...usersApiConfig.headers,
				authorization: localStorage.getItem('accessToken'),
			},
		}
	);
};

const updateUser = async (
	data: TUserUpdateApiReq
): Promise<TUserUpdateApiRes | Error> => {
	return await fetchWithRefresh<TUserUpdateApiRes>(
		`${usersApiConfig.baseUrl}/auth/user`,
		{
			method: 'PATCH',
			// @ts-expect-error "sprint5"
			headers: {
				...usersApiConfig.headers,
				authorization: localStorage.getItem('accessToken'),
			},
			body: JSON.stringify(data),
		}
	);
};

const forgotPassword = (
	data: TForgotPasswordApiReq
): Promise<TPasswordApiRes> => {
	return fetch(`${usersApiConfig.baseUrl}/password-reset`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	}).then(getResponse<TPasswordApiRes>);
};

const resetPassword = (
	data: TResetPasswordApiReq
): Promise<TPasswordApiRes> => {
	return fetch(`${usersApiConfig.baseUrl}/password-reset/reset`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	}).then(getResponse<TPasswordApiRes>);
};

const refreshToken = () => {
	return fetch(`${usersApiConfig.baseUrl}/auth/token`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(getResponse<TTokenRefreshApiReq>)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('accessToken', refreshData.accessToken);
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			return refreshData;
		})
		.catch((err) => {
			removeToken();
			return Promise.reject(err);
		});
};

export const fetchWithRefresh = async <T>(
	url: string | URL | Request,
	options?: RequestInit | undefined
): Promise<T | Error> => {
	try {
		const res = await fetch(url, options);
		return await getResponse<T>(res);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			try {
				const refreshData = await refreshToken();
				if (options && options.headers) {
					// @ts-expect-error "sprint5"
					options.headers.Authorization = refreshData.accessToken;
				}
				const res = await fetch(url, options);
				return await getResponse<T>(res);
			} catch (err_refresh) {
				return Promise.reject<Error>(err_refresh);
			}
		} else {
			return Promise.reject<Error>(err);
		}
	}
};

export const usersApi = {
	getUser,
	register,
	login,
	logout,
	updateUser,
	resetPassword,
	forgotPassword,
};
