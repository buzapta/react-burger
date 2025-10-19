import styles from './feed.module.css';
import { useDispatch, useSelector } from '@/services/store';
import {
	connectOrdersFeed,
	disconnectOrdersFeed,
} from '@/services/orders-feed/actions';
import {
	getOrdersFeed,
	getOrdersFeedLoading,
} from '@/services/orders-feed/reducers';
import { useEffect } from 'react';
import { ORDERS_FEED_SERVER_URL, feedTitle } from '@/config/consts';
import { OrdersList } from '../orders-list/orders-list';
import { TOrderItem } from '@/utils/types';
import { FeedTotals } from './feed-totals/feed-totals';
import { Preloader } from '@/components/preloader/preloader';

export const Feed = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const loading = useSelector(getOrdersFeedLoading);
	const orders: TOrderItem[] = useSelector(getOrdersFeed);

	useEffect(() => {
		dispatch(dispatch(connectOrdersFeed(ORDERS_FEED_SERVER_URL)));
		return () => {
			dispatch(dispatch(disconnectOrdersFeed()));
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
		<>
			<section className={styles.feed_orders}>
				<h1
					className={`${styles.title} text text_type_main-large mt-10 ml-10 mb-5`}>
					{feedTitle}
				</h1>
				<div className={`${styles.feed_orders_content}`}>
					<OrdersList orders={orders} show_status={false} />
				</div>
			</section>
			<section className={`${styles.feed_summary} pt-25 ml-10`}>
				<FeedTotals />
			</section>
		</>
	);
};
