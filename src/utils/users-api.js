import { getResponse } from './api';

const usersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

const setToken = (accessToken, refreshToken) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const removeToken = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

const getResponseWithSetToken = async (res) => {
	try {
		return await getResponse(res).then((response) => {
			setToken(response.accessToken, response.refreshToken);
			return response;
		});
	} catch (error) {
		removeToken();
		return Promise.reject(error);
	}
};

const register = async (data = {}) => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/register`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	});
	return getResponseWithSetToken(res);
};

const login = async (data = {}) => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/login`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	});
	return getResponseWithSetToken(res);
};

const logout = async () => {
	const res = await fetch(`${usersApiConfig.baseUrl}/auth/logout`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});
	removeToken();
	return getResponse(res);
};

const getUser = async () => {
	return await fetchWithRefresh(`${usersApiConfig.baseUrl}/auth/user`, {
		method: 'GET',
		headers: {
			...usersApiConfig.headers,
			Authorization: localStorage.getItem('accessToken'),
		},
	});
};

const updateUser = async (data = {}) => {
	return await fetchWithRefresh(`${usersApiConfig.baseUrl}/auth/user`, {
		method: 'PATCH',
		headers: {
			...usersApiConfig.headers,
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(data),
	});
};

const forgotPassword = (data = {}) => {
	return fetch(`${usersApiConfig.baseUrl}/password-reset`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	}).then(getResponse);
};

const resetPassword = (data = {}) => {
	return fetch(`${usersApiConfig.baseUrl}/password-reset/reset`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify(data),
	}).then(getResponse);
};

const refreshToken = () => {
	return fetch(`${usersApiConfig.baseUrl}/auth/token`, {
		method: 'POST',
		headers: usersApiConfig.headers,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(getResponse)
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

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await getResponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			try {
				const refreshData = await refreshToken();
				options.headers.Authorization = refreshData.accessToken;
				const res = await fetch(url, options);
				return await getResponse(res);
			} catch (err_refresh) {
				return Promise.reject(err_refresh);
			}
		} else {
			return Promise.reject(err);
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
