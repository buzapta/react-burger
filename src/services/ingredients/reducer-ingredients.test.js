import { ingredientsSlice, initialState } from './reducers';
import { loadIngredients } from './actions';
import { describe, it, expect } from 'vitest';

describe('ingredients reducers', () => {
	it('initial state test', () => {
		expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('loadIngredients pending', () => {
		expect(
			ingredientsSlice.reducer(initialState, {
				type: loadIngredients.pending.type,
			})
		).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('loadIngredients fulfilled', () => {
		const test_ingredients = [
			{
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
				type: 'bun',
				proteins: 80,
				fat: 24,
				carbohydrates: 53,
				calories: 420,
				price: 1255,
				image: 'https://code.s3.yandex.net/react/code/bun-02.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa0941',
				name: 'Биокотлета из марсианской Магнолии',
				type: 'main',
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: 'https://code.s3.yandex.net/react/code/meat-01.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
				__v: 0,
			},
		];

		const test_mapped_ingredients = new Map();
		test_ingredients.forEach((item) =>
			test_mapped_ingredients.set(item._id, item)
		);

		expect(
			ingredientsSlice.reducer(undefined, {
				type: loadIngredients.fulfilled.type,
				payload: { data: test_ingredients },
			})
		).toEqual({
			...initialState,
			ingredients: test_ingredients,
			loading: false,
			mapped_ingredients: Object.fromEntries(test_mapped_ingredients),
		});
	});

	it('loadIngredients rejected', () => {
		expect(
			ingredientsSlice.reducer(undefined, {
				type: loadIngredients.rejected.type,
			})
		).toEqual({
			...initialState,
			loading: false,
			error: 'Unknown error',
		});
	});
});
