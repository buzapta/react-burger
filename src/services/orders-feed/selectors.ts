import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { TOrderItem } from '@utils/types';

export const getOrdersByStatus = (status: string) =>
	createSelector(
		(store: TRootState) => store.ordersFeed.ordersFeedInfo.orders,
		(orders) =>
			orders.filter((order: TOrderItem) => order.status === status).slice(0, 10)
	);
