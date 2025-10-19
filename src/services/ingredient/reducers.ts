import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';

type TIngredientStore = {
	ingredient: TIngredient | null;
};

const initialState: TIngredientStore = {
	ingredient: null,
};

export const ingredientCurrentSlice = createSlice({
	name: 'ingredientCurrent',
	initialState,
	reducers: {
		showIngredient(state, action) {
			state.ingredient = action.payload;
		},
		clearIngredient(state) {
			state.ingredient = null;
		},
	},
});

export const { showIngredient, clearIngredient } =
	ingredientCurrentSlice.actions;
