import { fetchWithRefresh } from './users-api';
import { TOrdersApiReq, TOrdersApiRes } from '@utils/types';

export const ordersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const postOrder = async (
	orderIngredients: TOrdersApiReq
): Promise<TOrdersApiRes | Error> => {
	return await fetchWithRefresh(`${ordersApiConfig.baseUrl}/orders`, {
		method: 'POST',
		// @ts-expect-error "sprint5"
		headers: {
			...ordersApiConfig.headers,
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ ingredients: orderIngredients }),
	});
};
