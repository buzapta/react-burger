import { createSlice } from '@reduxjs/toolkit';
import { TOrdersProfileInfo, WebsocketStatus } from '@utils/types';
import {
	onCloseOrdersProfile,
	onConnectingOrdersProfile,
	onErrorOrdersProfile,
	onMessageOrdersProfile,
	onOpenOrdersProfile,
	disconnectOrdersProfile,
} from './actions';

export type OrdersProfileStore = {
	ordersProfileInfo: TOrdersProfileInfo;
	status: WebsocketStatus;
	loading: boolean;
	error: string | null;
};

export const initialState: OrdersProfileStore = {
	ordersProfileInfo: {
		orders: [],
		total: 0,
		totalToday: 0,
	},
	status: WebsocketStatus.OFFLINE,
	loading: true,
	error: null,
};

export const ordersProfileSlice = createSlice({
	name: 'ordersProfile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnectingOrdersProfile, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpenOrdersProfile, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onCloseOrdersProfile, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onErrorOrdersProfile, (state, action) => {
				state.error = action.payload;
			})
			.addCase(disconnectOrdersProfile, () => {
				return initialState;
			})
			.addCase(onMessageOrdersProfile, (state, action) => {
				state.loading = false;
				(state.ordersProfileInfo.orders = action.payload.orders),
					(state.ordersProfileInfo.total = action.payload.total);
				state.ordersProfileInfo.totalToday = action.payload.totalToday;
			});
	},
	selectors: {
		getOrdersProfile: (state: OrdersProfileStore) =>
			state.ordersProfileInfo.orders,
		getOrdersProfileLoading: (state: OrdersProfileStore) => state.loading,
	},
});
export const { getOrdersProfile, getOrdersProfileLoading } =
	ordersProfileSlice.selectors;
