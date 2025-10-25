import { ordersProfileSlice, initialState } from './reducers';
import {
	onMessageOrdersProfile,
	onConnectingOrdersProfile,
	onOpenOrdersProfile,
	onCloseOrdersProfile,
	onErrorOrdersProfile,
	disconnectOrdersProfile,
} from './actions';
import { WebsocketStatus } from '../../utils/types';
import { describe, it, expect } from 'vitest';

describe('orders-profile reducers', () => {
	const orders_profile_info = {
		orders: [
			{
				_id: '68f763e374993f001b5ba5da',
				ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
				status: 'done',
				name: 'Краторный био-марсианский бургер',
				createdAt: '2025-10-21T10:43:47.426Z',
				updatedAt: '2025-10-21T10:43:48.692Z',
				number: 91780,
			},
			{
				_id: '68f75fcb74993f001b5ba5d0',
				ingredients: [
					'643d69a5c3f7b9001cfa093d',
					'643d69a5c3f7b9001cfa0941',
					'643d69a5c3f7b9001cfa093e',
					'643d69a5c3f7b9001cfa093e',
					'643d69a5c3f7b9001cfa093e',
					'643d69a5c3f7b9001cfa093d',
				],
				status: 'done',
				name: 'Флюоресцентный люминесцентный био-марсианский бургер',
				createdAt: '2025-10-21T10:26:19.546Z',
				updatedAt: '2025-10-21T10:26:20.641Z',
				number: 91779,
			},
		],
		total: 2,
		totalToday: 2,
	};

	it('initial state test', () => {
		expect(ordersProfileSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('onMessageOrdersProfile', () => {
		expect(
			ordersProfileSlice.reducer(initialState, {
				type: onMessageOrdersProfile.type,
				payload: orders_profile_info,
			})
		).toEqual({
			...initialState,
			ordersProfileInfo: {
				orders: orders_profile_info.orders,
				total: orders_profile_info.total,
				totalToday: orders_profile_info.totalToday,
			},
			loading: false,
			status: 'OFFLINE',
			error: null,
		});
	});

	it('onConnectingOrdersProfile -> WebsocketStatus.CONNECTING', () => {
		expect(
			ordersProfileSlice.reducer(undefined, {
				type: onConnectingOrdersProfile.type,
			})
		).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('onConnectingOrdersProfile -> WebsocketStatus.ONLINE', () => {
		expect(
			ordersProfileSlice.reducer(undefined, { type: onOpenOrdersProfile.type })
		).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('onConnectingOrdersProfile -> WebsocketStatus.OFFLINE', () => {
		expect(
			ordersProfileSlice.reducer(undefined, { type: onCloseOrdersProfile.type })
		).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('onErrorOrdersProfile', () => {
		const error_text = 'text_error';
		expect(
			ordersProfileSlice.reducer(orders_profile_info, {
				type: onErrorOrdersProfile.type,
				payload: error_text,
			})
		).toEqual({
			...orders_profile_info,
			error: error_text,
		});
	});

	it('disconnectOrdersProfile', () => {
		expect(
			ordersProfileSlice.reducer(orders_profile_info, {
				type: disconnectOrdersProfile.type,
			})
		).toEqual(initialState);
	});
});
