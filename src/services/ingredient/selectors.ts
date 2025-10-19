import { TRootState } from '../store';

export const getIngredientCurrent = (store: TRootState) =>
	store.ingredientCurrent.ingredient;
