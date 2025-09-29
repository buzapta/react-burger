import { createSelector } from '@reduxjs/toolkit';

export const getIngredients = (store) => store.ingredients.ingredients;
export const getIngredientsState = (store) => store.ingredients;
export const getIngredientsByType = (burgerGroupTypeItem) =>
	createSelector(
		(store) => getIngredients(store),
		(ingredients) =>
			ingredients.filter(
				(ingredient) => ingredient.type === burgerGroupTypeItem.code
			)
	);
export const getIngredientById = (_id) =>
	createSelector(
		(store) => getIngredients(store),
		(ingredients) => ingredients.find((ingredient) => ingredient._id === _id)
	);
