import { getOrderInfoThunk } from './actions';
import { createSlice } from '@reduxjs/toolkit';
import { TOrderItem } from '@utils/types';

type TOrderInfoStore = {
	order_info: TOrderItem | null;
	loading_info: boolean;
};

const initialState: TOrderInfoStore = {
	order_info: null,
	loading_info: false,
};

export const ordersInfoSlice = createSlice({
	name: 'ordersInfo',
	initialState,
	reducers: {
		clearOrderInfo(state) {
			state.order_info = initialState.order_info;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrderInfoThunk.pending, (state) => {
				state.loading_info = true;
			})
			.addCase(getOrderInfoThunk.rejected, (state) => {
				state.loading_info = false;
			})
			.addCase(getOrderInfoThunk.fulfilled, (state, action) => {
				state.loading_info = false;
				if (action.payload.orders.length == 1) {
					state.order_info = action.payload.orders[0];
				}
			});
	},
	selectors: {
		getOrdersInfo: (state: TOrderInfoStore) => state,
	},
});

export const { getOrdersInfo } = ordersInfoSlice.selectors;

export const { clearOrderInfo } = ordersInfoSlice.actions;
