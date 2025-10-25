import { ordersFeedSlice, initialState } from './reducers';
import {
	onMessageOrdersFeed,
	onConnectingOrdersFeed,
	onOpenOrdersFeed,
	onCloseOrdersFeed,
	onErrorOrdersFeed,
	disconnectOrdersFeed,
} from './actions';
import { WebsocketStatus } from '../../utils/types';
import { describe, it, expect } from 'vitest';

describe('orders-deed reducers', () => {
	it('initial state test', () => {
		expect(ordersFeedSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('onMessageOrdersFeed', () => {
		const test_orders_feed_info = {
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

		expect(
			ordersFeedSlice.reducer(initialState, {
				type: onMessageOrdersFeed.type,
				payload: test_orders_feed_info,
			})
		).toEqual({
			...initialState,
			ordersFeedInfo: {
				orders: test_orders_feed_info.orders,
				total: test_orders_feed_info.total,
				totalToday: test_orders_feed_info.totalToday,
			},
			loading: false,
			status: 'OFFLINE',
			error: null,
		});
	});

	it('onCloseOrdersFeed -> WebsocketStatus.OFFLINE', () => {
		expect(
			ordersFeedSlice.reducer(undefined, { type: onCloseOrdersFeed.type })
		).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('onCloseOrdersFeed -> WebsocketStatus.CONNECTING', () => {
		expect(
			ordersFeedSlice.reducer(undefined, { type: onConnectingOrdersFeed.type })
		).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('onCloseOrdersFeed -> WebsocketStatus.ONLINE', () => {
		expect(
			ordersFeedSlice.reducer(undefined, { type: onOpenOrdersFeed.type })
		).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('onErrorOrdersFeed', () => {
		const error_text = 'text_error';
		expect(
			ordersFeedSlice.reducer(undefined, {
				type: onErrorOrdersFeed.type,
				payload: error_text,
			})
		).toEqual({
			...initialState,
			error: error_text,
		});
	});

	it('disconnectOrdersFeed', () => {
		expect(
			ordersFeedSlice.reducer(undefined, { type: disconnectOrdersFeed.type })
		).toEqual(initialState);
	});
});
