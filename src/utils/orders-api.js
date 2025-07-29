import { getResponse } from './api';

export const ordersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const postOrder = async (orderIngredients) => {
	console.log();
	const res = await fetch(`${ordersApiConfig.baseUrl}/orders`, {
		method: 'POST',
		headers: ordersApiConfig.headers,
		body: JSON.stringify({ ingredients: orderIngredients }),
	});
	return getResponse(res);
};
