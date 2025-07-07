import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	bun: null,
	ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		addBurgerIngredient: {
			reducer: (state, action) => {
				state.ingredients.push(action.payload);
			},
			prepare: (ingredient) => {
				return { payload: { ...ingredient, key: nanoid() } };
			},
		},
		removeBurgerIngredient: {
			reducer: (state, action) => {
				state.ingredients = state.ingredients.filter(
					(ingredient) => ingredient.key !== action.payload
				);
			},
		},
		addBurgerBun: {
			reducer: (state, action) => {
				state.bun = action.payload;
			},
		},
		moveBurgerIngredient: {
			reducer: (state, action) => {
				const ingredients = [...state.ingredients];
				ingredients.splice(
					action.payload.toIndex,
					0,
					ingredients.splice(action.payload.fromIndex, 1)[0]
				);
				state.ingredients = ingredients;
			},
		},
	},
});

export const {
	addBurgerIngredient,
	removeBurgerIngredient,
	addBurgerBun,
	moveBurgerIngredient,
} = burgerIngredientsSlice.actions;
