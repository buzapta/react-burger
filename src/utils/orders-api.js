import { fetchWithRefresh } from './users-api';

export const ordersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const postOrder = async (orderIngredients) => {
	return await fetchWithRefresh(`${ordersApiConfig.baseUrl}/orders`, {
		method: 'POST',
		headers: {
			...ordersApiConfig.headers,
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ ingredients: orderIngredients }),
	});
};
