import { loadIngredients } from './actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
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
			});
	},
});
