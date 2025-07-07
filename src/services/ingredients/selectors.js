import { createSelector } from '@reduxjs/toolkit';

export const getIngredients = (store) => store.ingredients.ingredients;
export const getIngredientsState = (store) => store.ingredients;
export const getIngredientsByType = (burgerGroupType) =>
	createSelector(
		(store) => getIngredients(store),
		(ingredients) =>
			ingredients.filter(
				(ingredient) => ingredient.type === burgerGroupType.code
			)
	);
