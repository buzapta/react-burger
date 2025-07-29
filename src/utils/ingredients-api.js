import { getResponse } from './api';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getIngredients = async () => {
	const res = await fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
		method: 'GET',
		headers: ingredientsApiConfig.headers,
	});
	return getResponse(res);
};
