import { TIngredient, TMappedIngredients } from '@utils/types';
import { loadIngredients } from './actions';
import { createSlice } from '@reduxjs/toolkit';

export type TIngredientsStore = {
	ingredients: TIngredient[];
	mapped_ingredients: TMappedIngredients | null;
	loading: boolean;
	error: string | null;
};

const initialState: TIngredientsStore = {
	ingredients: [],
	mapped_ingredients: null,
	loading: false,
	error: null,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.error = action.error?.message ?? 'Unknown error';
				state.loading = false;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.ingredients = action.payload.data;
				const mapped_ingredients = new Map();
				state.ingredients.forEach((item) =>
					mapped_ingredients.set(item._id, item)
				);
				state.mapped_ingredients = Object.fromEntries(mapped_ingredients);
			});
	},
});
