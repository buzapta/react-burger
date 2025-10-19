import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { TOrdersFeedInfoApiRes } from '@utils/types';
import { refreshToken } from '@utils/users-api';

export type TWsActions = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<TOrdersFeedInfoApiRes>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
	wsActions: TWsActions,
	withTokenRefresh: boolean = false
): Middleware<object, TRootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			onOpen,
			onClose,
			onError,
			onMessage,
			onConnecting,
			disconnect,
		} = wsActions;

		const { dispatch } = store;
		let reconnectTimer: null | ReturnType<typeof setTimeout> = null;
		let url = '';
		let isConnected = false;

		return (next) => {
			return (action) => {
				if (!action) return;

				if (connect.match(action)) {
					socket = new WebSocket(action.payload);
					url = action.payload;
					isConnected = true;
					onConnecting && dispatch(onConnecting());
					socket.onopen = () => {
						onOpen && dispatch(onOpen());
					};
					socket.onerror = () => {
						dispatch(onError('Unknown error'));
					};

					socket.onclose = () => {
						onClose && dispatch(onClose());
						if (isConnected) {
							reconnectTimer = setTimeout(() => {
								dispatch(connect(url));
							}, RECONNECT_PERIOD);
						}
					};

					socket.onmessage = (event) => {
						const { data } = event;
						try {
							const parsedData = JSON.parse(data);
							if (
								withTokenRefresh &&
								parsedData.message === 'Invalid or missing token'
							) {
								refreshToken()
									.then((refreshedData) => {
										const wssUrl = new URL(url);
										wssUrl.searchParams.set(
											'token',
											refreshedData.accessToken.replace('Bearer ', '')
										);
										dispatch(connect(wssUrl.toString()));
									})
									.catch((error) => {
										dispatch(onError((error as Error).message));
									});

								dispatch(disconnect());
								return;
							}

							dispatch(onMessage(parsedData));
						} catch (error) {
							dispatch(onError((error as Error).message));
						}
					};
					return;
				}
				if (disconnect.match(action)) {
					isConnected = false;
					if (reconnectTimer) {
						clearTimeout(reconnectTimer);
					}
					socket?.close();
					socket = null;
				}
				return next(action);
			};
		};
	};
};
