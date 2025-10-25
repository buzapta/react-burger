import {
	ingredientCurrentSlice,
	initialState,
	showIngredient,
	clearIngredient,
} from './reducers';
import { describe, it, expect } from 'vitest';

describe('ingredient reducers', () => {
	const test_ingredient = {
		_id: '643d69a5c3f7b9001cfa093d',
		name: 'Флюоресцентная булка R2-D3',
		type: 'bun',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/bun-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
		__v: 0,
	};

	it('initial state test', () => {
		expect(ingredientCurrentSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('showIngredient', () => {
		expect(
			ingredientCurrentSlice.reducer(initialState, {
				type: showIngredient.type,
				payload: test_ingredient,
			})
		).toEqual({
			...initialState,
			ingredient: test_ingredient,
		});
	});

	it('clearIngredient', () => {
		expect(
			ingredientCurrentSlice.reducer(
				{ ...initialState, ingredient: test_ingredient },
				{ type: clearIngredient.type, payload: test_ingredient }
			)
		).toEqual({
			...initialState,
			ingredient: null,
		});
	});
});
