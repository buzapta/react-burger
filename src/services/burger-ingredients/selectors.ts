import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { TIngredientWithKey } from '@utils/types';
import { TBurgerIngredientsStore } from './reducers';

export const getBurgerIngredientsState = (
	store: TRootState
): TBurgerIngredientsStore => store.burgerIngredients;

export const getBurgerIngredientCount = (_id: TIngredientWithKey['_id']) =>
	createSelector(
		(store: TRootState) => getBurgerIngredientsState(store),
		({ bun, ingredients }) => {
			return (
				ingredients.filter(
					(ingredient: TIngredientWithKey) => ingredient._id === _id
				).length +
				((bun?._id === _id) as unknown as number) * 2
			);
		}
	);

export const getBurgerIngredientsPrice = () =>
	createSelector(
		(store: TRootState) => getBurgerIngredientsState(store),
		({ bun, ingredients }) =>
			ingredients.reduce(
				(sum: number, ingredient: TIngredientWithKey) => sum + ingredient.price,
				(bun?.price ?? 0) * 2
			)
	);
