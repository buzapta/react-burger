import {
	combineSlices,
	configureStore,
	createSelector,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducers';
import { ingredientCurrentSlice } from './ingredient/reducers';
import { burgerIngredientsSlice } from './burger-ingredients/reducers';
import { ordersSlice } from './orders/reducers';
import { usersSlice } from './users/reducers';
import { ordersFeedSlice } from './orders-feed/reducers';
import { ordersProfileSlice } from './orders-profile/reducers';
import { ordersInfoSlice } from './orders-info/reducers';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { UnknownAction } from 'redux';
import {
	connectOrdersFeed,
	disconnectOrdersFeed,
	onCloseOrdersFeed,
	onConnectingOrdersFeed,
	onErrorOrdersFeed,
	onMessageOrdersFeed,
	onOpenOrdersFeed,
} from './orders-feed/actions';

import {
	connectOrdersProfile,
	disconnectOrdersProfile,
	onCloseOrdersProfile,
	onConnectingOrdersProfile,
	onErrorOrdersProfile,
	onMessageOrdersProfile,
	onOpenOrdersProfile,
} from './orders-profile/actions';

const rootReducer = combineSlices(
	ingredientsSlice,
	ingredientCurrentSlice,
	burgerIngredientsSlice,
	ordersSlice,
	usersSlice,
	ordersFeedSlice,
	ordersProfileSlice,
	ordersInfoSlice
);

const orderFeedMiddleware = socketMiddleware({
	connect: connectOrdersFeed,
	onOpen: onOpenOrdersFeed,
	onClose: onCloseOrdersFeed,
	onError: onErrorOrdersFeed,
	onMessage: onMessageOrdersFeed,
	onConnecting: onConnectingOrdersFeed,
	disconnect: disconnectOrdersFeed,
});

const orderProfileMiddleware = socketMiddleware(
	{
		connect: connectOrdersProfile,
		onOpen: onOpenOrdersProfile,
		onClose: onCloseOrdersProfile,
		onError: onErrorOrdersProfile,
		onMessage: onMessageOrdersProfile,
		onConnecting: onConnectingOrdersProfile,
		disconnect: disconnectOrdersProfile,
	},
	true
);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(orderFeedMiddleware, orderProfileMiddleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, unknown, UnknownAction>;
export const useDispatch = dispatchHook.withTypes<TAppDispatch>();
export const useSelector = selectorHook.withTypes<TRootState>();
export const createSelectorTyped = createSelector.withTypes<TRootState>();
