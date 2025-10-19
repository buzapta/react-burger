import { createAction } from '@reduxjs/toolkit';
import { TOrdersProfileInfoApiRes } from '@utils/types';

export const connectOrdersProfile = createAction<
	string,
	'ordersProfile/connect'
>('ordersProfile/connect');
export const disconnectOrdersProfile = createAction('ordersProfile/disconnect');

export const onConnectingOrdersProfile = createAction(
	'ordersProfile/onConnecting'
);
export const onOpenOrdersProfile = createAction('ordersProfile/onOpen');
export const onCloseOrdersProfile = createAction('ordersProfile/onClose');
export const onErrorOrdersProfile = createAction<
	string,
	'ordersProfile/onError'
>('ordersProfile/onError');
export const onMessageOrdersProfile = createAction<
	TOrdersProfileInfoApiRes,
	'ordersProfile/onMessage'
>('ordersProfile/onMessage');
