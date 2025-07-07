import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducers.js';
import { ingredientCurrentSlice } from './ingredient/reducers.js';
import { burgerIngredientsSlice } from './burger-ingredients/reducers.js';
import { ordersSlice } from './orders/reducers.js';

const rootReducer = combineSlices(
	ingredientsSlice,
	ingredientCurrentSlice,
	burgerIngredientsSlice,
	ordersSlice
);

export const createStore = (initialState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};
