import { fetchWithRefresh } from './users-api';
import { getResponse } from './api';
import { TOrdersApiReq, TOrdersApiRes, TOrderInfoApiRes } from '@utils/types';

export const ordersApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/orders',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const postOrder = async (
	orderIngredients: TOrdersApiReq
): Promise<TOrdersApiRes> => {
	return await fetchWithRefresh(`${ordersApiConfig.baseUrl}`, {
		method: 'POST',
		// @ts-expect-error "unknown Authorization"
		headers: {
			...ordersApiConfig.headers,
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ ingredients: orderIngredients }),
	});
};

export const getOrderInfo = async (
	ordernumber: number
): Promise<TOrderInfoApiRes> => {
	return fetch(`${ordersApiConfig.baseUrl}/${ordernumber}`, {
		method: 'GET',
		headers: ordersApiConfig.headers,
	}).then(getResponse<TOrderInfoApiRes>);
};
