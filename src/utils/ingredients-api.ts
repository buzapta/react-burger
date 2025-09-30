import { getResponse } from './api';
import { TIngredientsApiRes } from '@utils/types';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
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
