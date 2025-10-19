import { getOrderInfo } from '../../utils/orders-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderInfoThunk = createAsyncThunk(
	'orders/getOrderByNumber',
	async (order_number: number) => {
		return getOrderInfo(order_number);
	}
);
