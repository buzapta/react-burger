import { createSelector } from '@reduxjs/toolkit';

export const getBurgerIngredientsState = (store) => store.burgerIngredients;

export const getBurgerIngredientCount = (_id) =>
	createSelector(
		(store) => getBurgerIngredientsState(store),
		({ bun, ingredients }) => {
			return (
				ingredients.filter((ingredient) => ingredient._id === _id).length +
				(bun?._id === _id) * 2
			);
		}
	);
export const getBurgerIngredientsPrice = () =>
	createSelector(
		(store) => getBurgerIngredientsState(store),
		({ bun, ingredients }) =>
			ingredients.reduce(
				(sum, ingredient) => sum + ingredient.price,
				(bun?.price ?? 0) * 2
			)
	);
