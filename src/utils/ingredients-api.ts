import { getResponse } from './api';
import { TIngredientsApiRes } from '@utils/types';
import { BASE_API_URL } from '@/config/consts';

export const ingredientsApiConfig = {
	baseUrl: BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getIngredients = async (): Promise<TIngredientsApiRes> => {
	const res = await fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
		method: 'GET',
		headers: ingredientsApiConfig.headers,
	});
	return getResponse<TIngredientsApiRes>(res);
};
