import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredientWithKey } from '@utils/types';

export type TBurgerIngredientsStore = {
	bun: TIngredientWithKey | null;
	ingredients: TIngredientWithKey[];
};

export const initialState: TBurgerIngredientsStore = {
	bun: null,
	ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		addBurgerIngredient: {
			reducer: (state, action: PayloadAction<TIngredientWithKey>) => {
				state.ingredients.push(action.payload);
			},
			prepare: (ingredient) => {
				return { payload: { ...ingredient, key: nanoid() } };
			},
		},
		clearBurgerIngredients(state) {
			state.ingredients = initialState.ingredients;
			state.bun = initialState.bun;
		},
		removeBurgerIngredient(state, action) {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient.key !== action.payload
			);
		},
		addBurgerBun(state, action) {
			state.bun = action.payload;
		},
		moveBurgerIngredient(state, action) {
			const ingredients = [...state.ingredients];
			ingredients.splice(
				action.payload.toIndex,
				0,
				ingredients.splice(action.payload.fromIndex, 1)[0]
			);
			state.ingredients = ingredients;
		},
	},
});

export const {
	addBurgerIngredient,
	removeBurgerIngredient,
	addBurgerBun,
	moveBurgerIngredient,
	clearBurgerIngredients,
} = burgerIngredientsSlice.actions;
