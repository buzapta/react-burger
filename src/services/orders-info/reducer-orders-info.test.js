import { ordersInfoSlice, initialState, clearOrderInfo } from './reducers';
import { getOrderInfoThunk } from './actions';
import { describe, it, expect } from 'vitest';

describe('orders-info reducers', () => {
	it('initial state test', () => {
		expect(ordersInfoSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('clearOrderInfo', () => {
		const state_with_order = {
			order_info: {
				_id: '68f763e374993f001b5ba5da',
				ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
				status: 'done',
				name: 'Краторный био-марсианский бургер',
				createdAt: '2025-10-21T10:43:47.426Z',
				updatedAt: '2025-10-21T10:43:48.692Z',
				number: 91780,
			},
			loading_info: false,
		};

		expect(
			ordersInfoSlice.reducer(state_with_order, { type: clearOrderInfo.type })
		).toEqual({
			...initialState,
			order_info: initialState.order_info,
		});
	});

	it('getOrderInfoThunk', () => {
		expect(
			ordersInfoSlice.reducer(undefined, {
				type: getOrderInfoThunk.pending.type,
			})
		).toEqual({
			...initialState,
			loading_info: true,
		});
	});

	it('getOrderInfoThunk fulfilled', () => {
		const order_to_get = {
			_id: '68f763e374993f001b5ba5da',
			ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
			status: 'done',
			name: 'Краторный био-марсианский бургер',
			createdAt: '2025-10-21T10:43:47.426Z',
			updatedAt: '2025-10-21T10:43:48.692Z',
			number: 91780,
		};

		const order_info_to_get = {
			orders: [order_to_get],
		};

		expect(
			ordersInfoSlice.reducer(undefined, {
				type: getOrderInfoThunk.fulfilled.type,
				payload: order_info_to_get,
			})
		).toEqual({
			...initialState,
			order_info: order_to_get,
			loading_info: false,
		});
	});

	it('getOrderInfoThunk rejected', () => {
		expect(
			ordersInfoSlice.reducer(undefined, {
				type: getOrderInfoThunk.rejected.type,
			})
		).toEqual({
			...initialState,
			loading_info: false,
		});
	});
});
