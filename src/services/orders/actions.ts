import { postOrder } from '../../utils/orders-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrderValidateError } from './reducers';
import { TOrdersApiReq, TIngredient } from '@/utils/types';
import { store, TAppDispatch } from '../store';

export const addOrderThunk = createAsyncThunk(
	'orders/addOrder',
	async (orderIngredients: TOrdersApiReq) => {
		return postOrder(orderIngredients);
	}
);

export const addOrder =
	() => (dispatch: TAppDispatch, getState: typeof store.getState) => {
		const burgerIngredients = getState().burgerIngredients;
		if (burgerIngredients.ingredients.length > 0 && burgerIngredients.bun) {
			const orderIngredients: TOrdersApiReq = [
				burgerIngredients.bun._id,
				...burgerIngredients.ingredients.map(
					(ingredient: TIngredient) => ingredient._id
				),
				burgerIngredients.bun._id,
			];
			dispatch(addOrderThunk(orderIngredients));
		} else {
			dispatch(
				addOrderValidateError('Заказ должен содержать булки и ингредиенты.')
			);
		}
	};
