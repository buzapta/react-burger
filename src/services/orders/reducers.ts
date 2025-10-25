import { addOrderThunk } from './actions';
import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils/types';

type TOrderStore = {
	order: TOrder | null;
	loading: boolean;
	error: string | null;
};

export const initialState: TOrderStore = {
	order: null,
	loading: false,
	error: null,
};

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addOrderValidateError(state, action) {
			state.error = action.payload;
			state.loading = false;
		},
		clearOrder(state) {
			state.order = initialState.order;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addOrderThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addOrderThunk.rejected, (state) => {
				state.error = 'Unknown error';
				state.loading = false;
			})
			.addCase(addOrderThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.order = action.payload;
			});
	},
	selectors: {
		getOrders: (state: TOrderStore) => state,
	},
});

export const { getOrders } = ordersSlice.selectors;

export const { addOrderValidateError, clearOrder } = ordersSlice.actions;
