import { OrderItem } from '../order-item/order-item';
import styles from './orders-list.module.css';
import { TOrderItem } from '@utils/types';

type Tprops = {
	orders: TOrderItem[];
	show_status: boolean;
};

export const OrdersList = (props: Tprops): React.JSX.Element => {
	const orders = props.orders;
	const show_status = props.show_status;
	return (
		<div className={`${styles.container}`}>
			<ul className={`${styles.list}`}>
				{orders.map((item) => (
					<li key={item._id}>
						<OrderItem order={item} show_status={show_status} />
					</li>
				))}
			</ul>
		</div>
	);
};
