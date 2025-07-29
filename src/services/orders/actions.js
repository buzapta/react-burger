import { postOrder } from '../../utils/orders-api.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrderValidateError } from './reducers.js';
import { clearBurgerIngredients } from '../burger-ingredients/reducers.js';

export const addOrderThunk = createAsyncThunk(
	'orders/addOrder',
	async (orderIngredients) => {
		return postOrder(orderIngredients);
	}
);

export const addOrder = () => (dispatch, getState) => {
	const burgerIngredients = getState().burgerIngredients;
	if (burgerIngredients.ingredients.length > 0 && burgerIngredients.bun) {
		const orderIngredients = [
			burgerIngredients.bun._id,
			...burgerIngredients.ingredients.map((ingredient) => ingredient._id),
			burgerIngredients.bun._id,
		];
		dispatch(addOrderThunk(orderIngredients));
		dispatch(clearBurgerIngredients());
	} else {
		dispatch(addOrderValidateError('Ошибка содержимого заказа'));
	}
};
