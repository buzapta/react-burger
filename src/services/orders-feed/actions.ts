import { createAction } from '@reduxjs/toolkit';
import { TOrdersFeedInfoApiRes } from '@utils/types';

export const connectOrdersFeed = createAction<string, 'ordersFeed/connect'>(
	'ordersFeed/connect'
);
export const disconnectOrdersFeed = createAction('ordersFeed/disconnect');

export const onConnectingOrdersFeed = createAction('ordersFeed/onConnecting');
export const onOpenOrdersFeed = createAction('ordersFeed/onOpen');
export const onCloseOrdersFeed = createAction('ordersFeed/onClose');
export const onErrorOrdersFeed = createAction<string, 'ordersFeed/onError'>(
	'ordersFeed/onError'
);
export const onMessageOrdersFeed = createAction<
	TOrdersFeedInfoApiRes,
	'ordersFeed/onMessage'
>('ordersFeed/onMessage');
