import styles from './orders-profile.module.css';
import { useDispatch, useSelector } from '@/services/store';
import {
	connectOrdersProfile,
	disconnectOrdersProfile,
} from '@/services/orders-profile/actions';
import {
	getOrdersProfile,
	getOrdersProfileLoading,
} from '@/services/orders-profile/reducers';
import { useEffect } from 'react';
import { ORDERS_PROFILE_SERVER_URL } from '@/config/consts';
import { OrdersList } from '@/components/orders-list/orders-list';
import { TOrderItem } from '@/utils/types';
import { Preloader } from '@/components/preloader/preloader';

export const OrdersProfile = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const loading = useSelector(getOrdersProfileLoading);
	const orders: TOrderItem[] = useSelector(getOrdersProfile);

	useEffect(() => {
		const wssUrl = new URL(ORDERS_PROFILE_SERVER_URL);
		wssUrl.searchParams.set(
			'token',
			localStorage.getItem('accessToken')?.replace('Bearer ', '') ?? ''
		);
		dispatch(dispatch(connectOrdersProfile(wssUrl.toString())));
		return () => {
			dispatch(dispatch(disconnectOrdersProfile()));
		};
	}, [dispatch]);

	if (loading) {
		return (
			<div className={styles.loader}>
				<Preloader />
			</div>
		);
	}

	return (
		<div className={`mt-5 ml-15 ${styles.profile_orders}`}>
			<div className={`${styles.profile_orders_content}`}>
				<OrdersList orders={orders} show_status={true} />
			</div>
		</div>
	);
};
