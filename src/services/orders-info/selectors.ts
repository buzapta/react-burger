import { TOrderItem } from '@/utils/types';
import { useSelector } from '../store';
import { getOrdersFeed } from '../orders-feed/reducers';
import { getOrdersProfile } from '../orders-profile/reducers';
import { getOrdersInfo } from './reducers';

export const FindOrderInfoByNumber = (order_number: number) => {
	const ordersFeed = useSelector(getOrdersFeed);
	const ordersProfile = useSelector(getOrdersProfile);
	const { order_info } = useSelector(getOrdersInfo);

	let order = ordersFeed.find(
		(order: TOrderItem) => order.number === order_number
	);
	if (order) {
		return order;
	}

	order = ordersProfile.find(
		(order: TOrderItem) => order.number === order_number
	);
	if (order) {
		return order;
	}

	return order_info;
};
