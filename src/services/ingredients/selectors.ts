import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { TIngredient, TBurgerGroupTypeItem } from '@utils/types';

export const getIngredients = (store: TRootState) =>
	store.ingredients.ingredients;
export const getMappedIngredients = (store: TRootState) =>
	store.ingredients.mapped_ingredients;
export const getIngredientsState = (store: TRootState) => store.ingredients;
export const getIngredientsByType = (
	burgerGroupTypeItem: TBurgerGroupTypeItem
) =>
	createSelector(
		(store: TRootState) => getIngredients(store),
		(ingredients) =>
			ingredients.filter(
				(ingredient: TIngredient) =>
					ingredient.type === burgerGroupTypeItem.code
			)
	);

export const getIngredientById = (_id: TIngredient['_id'] | undefined) =>
	createSelector(
		(store: TRootState) => getMappedIngredients(store),
		(mapped_ingredients) =>
			_id
				? mapped_ingredients
					? mapped_ingredients[_id]
					: undefined
				: undefined
	);

export const getIngredientsByIdArray = (ingredientsIdArray: string[]) =>
	createSelector(
		(store: TRootState) => getMappedIngredients(store),
		(mapped_ingredients) => {
			let ingredients: TIngredient[] = [];
			if (mapped_ingredients) {
				ingredients = ingredientsIdArray.map(
					(ingredientsId: string) => mapped_ingredients[ingredientsId]
				);
			}
			return ingredients;
		}
	);

export const getIngredientsPriceByIdArray = (ingredientsIdArray: string[]) =>
	createSelector(
		(store: TRootState) => getMappedIngredients(store),
		(mapped_ingredients) =>
			ingredientsIdArray.reduce(
				(sum: number, ingredientsId: string) =>
					sum +
					(mapped_ingredients ? mapped_ingredients[ingredientsId].price : 0),
				0
			)
	);
