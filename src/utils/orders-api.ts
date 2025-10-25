import { fetchWithRefresh } from './users-api';
import { getResponse } from './api';
import { TOrdersApiReq, TOrdersApiRes, TOrderInfoApiRes } from '@utils/types';
import { BASE_API_URL } from '@/config/consts';

export const ordersApiConfig = {
	baseUrl: `${BASE_API_URL}/orders`,
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
