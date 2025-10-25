import { createSlice } from '@reduxjs/toolkit';
import { TOrdersFeedInfo, WebsocketStatus } from '@utils/types';
import {
	onCloseOrdersFeed,
	onConnectingOrdersFeed,
	onErrorOrdersFeed,
	onMessageOrdersFeed,
	onOpenOrdersFeed,
} from './actions';

export type OrdersFeedStore = {
	ordersFeedInfo: TOrdersFeedInfo;
	status: WebsocketStatus;
	loading: boolean;
	error: string | null;
};

export const initialState: OrdersFeedStore = {
	ordersFeedInfo: {
		orders: [],
		total: 0,
		totalToday: 0,
	},
	status: WebsocketStatus.OFFLINE,
	loading: true,
	error: null,
};

export const ordersFeedSlice = createSlice({
	name: 'ordersFeed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnectingOrdersFeed, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpenOrdersFeed, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onCloseOrdersFeed, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onErrorOrdersFeed, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessageOrdersFeed, (state, action) => {
				state.loading = false;
				state.ordersFeedInfo.orders = action.payload.orders;
				state.ordersFeedInfo.total = action.payload.total;
				state.ordersFeedInfo.totalToday = action.payload.totalToday;
			});
	},
	selectors: {
		getOrdersFeed: (state: OrdersFeedStore) => state.ordersFeedInfo.orders,
		getOrdersFeedTotal: (state: OrdersFeedStore) => state.ordersFeedInfo.total,
		getOrdersFeedTotalToday: (state: OrdersFeedStore) =>
			state.ordersFeedInfo.totalToday,
		getOrdersFeedLoading: (state: OrdersFeedStore) => state.loading,
	},
});
export const {
	getOrdersFeed,
	getOrdersFeedTotal,
	getOrdersFeedTotalToday,
	getOrdersFeedLoading,
} = ordersFeedSlice.selectors;
