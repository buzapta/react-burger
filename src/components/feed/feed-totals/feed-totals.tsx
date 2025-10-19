import styles from './feed-totals.module.css';
import {
	feedTotalsDoneHeader,
	feedTotalsPendingHeader,
	feedTotalsDoneAllTime,
	feedTotalsDoneToday,
	order_item_status,
} from '@/config/consts';
import { getOrdersByStatus } from '@/services/orders-feed/selectors';
import {
	getOrdersFeedTotal,
	getOrdersFeedTotalToday,
} from '@/services/orders-feed/reducers';
import { useSelector } from 'react-redux';

export const FeedTotals = (): React.JSX.Element => {
	const orders_done = useSelector(getOrdersByStatus(order_item_status.done));
	const orders_pending = useSelector(
		getOrdersByStatus(order_item_status.pending)
	);
	const ordersTotal = useSelector(getOrdersFeedTotal);
	const ordersTotalToday = useSelector(getOrdersFeedTotalToday);

	return (
		<div className={`${styles.feed_totals}`}>
			<div className={`${styles.feed_totalsboard}`}>
				<div className={`${styles.feed_totalsboard_done}`}>
					<p className={'text text_type_main-medium mb-6'}>
						{feedTotalsDoneHeader}
					</p>
					<ul className={`${styles.feed_totalsboard_donenum}`}>
						{orders_done.map((item) => (
							<li key={item._id} className={'text text_type_digits-default'}>
								{item.number}
							</li>
						))}
					</ul>
				</div>
				<div className={`${styles.feed_totalsboard_pending}`}>
					<p className={'text text_type_main-medium mb-6'}>
						{feedTotalsPendingHeader}
					</p>
					<ul className={`${styles.feed_totalsboard_pendingnum}`}>
						{orders_pending.map((item) => (
							<li key={item._id} className={'text text_type_digits-default'}>
								{item.number}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={`${styles.totals_all_time} mt-15`}>
				<p className={'text text_type_main-medium'}>{feedTotalsDoneAllTime}</p>
				<p className={'text text_type_digits-large'}>{ordersTotal}</p>
			</div>
			<div className={`${styles.totals_today} mt-15`}>
				<p className={'text text_type_main-medium'}>{feedTotalsDoneToday}</p>
				<p className={'text text_type_digits-large'}>{ordersTotalToday}</p>
			</div>
		</div>
	);
};
