import { addOrderThunk } from './actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	order: null,
	loading: false,
	error: null,
};

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addOrderValidateError: {
			reducer: (state, action) => {
				state.error = action.payload;
				state.loading = false;
			},
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addOrderThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addOrderThunk.rejected, (state, action) => {
				state.error = action.error?.message ?? 'Unknown error';
				state.loading = false;
			})
			.addCase(addOrderThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.order = action.payload;
			});
	},
});

export const { addOrderValidateError } = ordersSlice.actions;
