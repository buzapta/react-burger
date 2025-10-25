import {
	burgerIngredientsSlice,
	initialState,
	addBurgerIngredient,
	clearBurgerIngredients,
	removeBurgerIngredient,
	addBurgerBun,
	moveBurgerIngredient,
} from './reducers';
import { describe, it, expect } from 'vitest';

describe('burger-ingredients reducers', () => {
	const test_ingredient_without_key = {
		_id: '643d69a5c3f7b9001cfa0944',
		name: 'Соус традиционный галактический',
		type: 'sauce',
		proteins: 42,
		fat: 24,
		carbohydrates: 42,
		calories: 99,
		price: 15,
		image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
		__v: 0,
	};

	const test_ingredient_1 = {
		_id: '643d69a5c3f7b9001cfa0942',
		name: 'Соус Spicy-X',
		type: 'sauce',
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
		calories: 30,
		key: 'testkey 1',
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
		__v: 0,
	};

	const test_ingredient_2 = {
		_id: '643d69a5c3f7b9001cfa0941',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		key: 'testkey 2',
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		__v: 0,
	};

	const test_ingredient_3 = {
		_id: '643d69a5c3f7b9001cfa0940',
		name: 'Говяжий метеорит (отбивная)',
		type: 'main',
		proteins: 800,
		fat: 800,
		carbohydrates: 300,
		calories: 2674,
		price: 3000,
		image: 'https://code.s3.yandex.net/react/code/meat-04.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
		__v: 0,
		key: '2oGzSNtzGCiMUaFzLO8yH',
	};

	const test_bun = {
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

	const test_ingredients = [
		test_ingredient_1,
		test_ingredient_2,
		test_ingredient_3,
	];

	it('initial state test', () => {
		expect(burgerIngredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('addBurgerIngredient', () => {
		expect(
			burgerIngredientsSlice.reducer(
				{ ...initialState, ingredients: test_ingredients },
				{ type: addBurgerIngredient.type, payload: test_ingredient_without_key }
			).ingredients
		).toEqual(expect.arrayContaining([test_ingredient_without_key]));
	});

	it('clearBurgerIngredients', () => {
		expect(
			burgerIngredientsSlice.reducer(
				{ ...initialState, ingredients: test_ingredients },
				{ type: clearBurgerIngredients.type }
			)
		).toEqual({
			...initialState,
			ingredients: initialState.ingredients,
			bun: initialState.bun,
		});
	});

	it('removeBurgerIngredient', () => {
		expect(
			burgerIngredientsSlice.reducer(
				{ ...initialState, ingredients: test_ingredients },
				{ type: removeBurgerIngredient.type, payload: test_ingredient_1.key }
			)
		).toEqual({
			...initialState,
			ingredients: test_ingredients.filter(
				(ingredient) => ingredient.key !== test_ingredient_1.key
			),
		});
	});

	it('addBurgerBun', () => {
		expect(
			burgerIngredientsSlice.reducer(initialState, {
				type: addBurgerBun.type,
				payload: test_bun,
			})
		).toEqual({
			...initialState,
			bun: test_bun,
		});
	});

	it('moveBurgerIngredient', () => {
		const test_move = {
			fromIndex: 0,
			toIndex: 2,
		};

		const test_result_ingredients = test_ingredients;
		test_ingredients.splice(
			test_move.toIndex,
			0,
			test_ingredients.splice(test_move.fromIndex, 1)[0]
		);

		expect(
			burgerIngredientsSlice.reducer(
				{ ...initialState, ingredients: test_ingredients },
				{ type: moveBurgerIngredient.type, payload: {} }
			)
		).toEqual({
			...initialState,
			ingredients: test_result_ingredients,
		});
	});
});
