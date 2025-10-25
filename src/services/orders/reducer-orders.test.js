import {
	ordersSlice,
	initialState,
	addOrderValidateError,
	clearOrder,
} from './reducers';
import { addOrderThunk } from './actions';
import { describe, it, expect } from 'vitest';

describe('orders reducers', () => {
	it('initial state test', () => {
		expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('addOrderValidateError', () => {
		const error_text = 'Произошла ошибка!';
		expect(
			ordersSlice.reducer(undefined, {
				type: addOrderValidateError.type,
				payload: error_text,
			})
		).toEqual({
			...initialState,
			error: error_text,
			loading: false,
		});
	});

	it('clearOrder', () => {
		const state_with_order = {
			order: {
				name: 'Test order name',
				order: {
					number: 123,
				},
			},
			loading: false,
			error: null,
		};

		expect(
			ordersSlice.reducer(state_with_order, { type: clearOrder.type })
		).toEqual({
			...initialState,
			order: initialState.order,
		});
	});

	it('addOrderThunk pending', () => {
		expect(
			ordersSlice.reducer(undefined, { type: addOrderThunk.pending.type })
		).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('addOrderThunk fulfilled', () => {
		const new_added_order = {
			name: 'Test order name',
			order: {
				number: 123,
			},
		};

		expect(
			ordersSlice.reducer(undefined, {
				type: addOrderThunk.fulfilled.type,
				payload: new_added_order,
			})
		).toEqual({
			...initialState,
			loading: false,
			order: new_added_order,
		});
	});

	it('addOrderThunk rejected', () => {
		expect(
			ordersSlice.reducer(undefined, { type: addOrderThunk.rejected.type })
		).toEqual({
			...initialState,
			loading: false,
			error: 'Unknown error',
		});
	});
});
