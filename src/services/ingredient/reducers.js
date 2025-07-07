import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredient: null,
};

export const ingredientCurrentSlice = createSlice({
	name: 'ingredientCurrent',
	initialState,
	reducers: {
		showIngredient: {
			reducer: (state, action) => {
				state.ingredient = action.payload;
			},
		},
		clearIngredient: {
			reducer: (state) => {
				state.ingredient = null;
			},
		},
	},
});

export const { showIngredient, clearIngredient } =
	ingredientCurrentSlice.actions;
