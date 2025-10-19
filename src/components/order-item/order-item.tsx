import styles from './order-item.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TOrderItem } from '@utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '@/services/store';
import {
	getIngredientsPriceByIdArray,
	getIngredientsByIdArray,
} from '@/services/ingredients/selectors';
import { OrderItemIngredients } from './order-item-ingredients/order-item-ingredients';
import { order_item_status, order_item_status_name } from '@/config/consts';

type Tprops = {
	order: TOrderItem;
	show_status: boolean;
};

export const OrderItem = (props: Tprops): React.JSX.Element => {
	const location = useLocation();
	const order = props.order;
	const show_status = props.show_status;
	const order_price: number = useSelector(
		getIngredientsPriceByIdArray(order.ingredients)
	);
	const order_ingredients: TIngredient[] = useSelector(
		getIngredientsByIdArray(order.ingredients)
	);
	return (
		<Link
			key={order._id}
			className={styles.order_item}
			to={`${location.pathname}/${order.number}`}
			state={{ backgroundLocation: location }}>
			<article className={styles.order_item_container}>
				<div className={`${styles.order_item_header} mt-6 ml-6 mr-6`}>
					<p className={'text text_type_digits-default'}>#{order.number}</p>
					<FormattedDate
						className={'text text_type_main-default text_color_inactive'}
						date={new Date(order.createdAt)}
					/>
				</div>
				<p className={'text text_type_main-medium mt-6 ml-6 mr-6'}>
					{order.name}
				</p>
				{show_status && (
					<p
						className={
							'text text_type_main-default mt-2 ml-6 mr-6' +
							(order.status == order_item_status.done
								? ` ${styles.order_item_done}`
								: '')
						}>
						{order_item_status_name[order.status]}
					</p>
				)}
				<div className={`${styles.order_item_ingredients} mt-6 mr-6 mb-6`}>
					<OrderItemIngredients
						order_ingredients={order_ingredients}></OrderItemIngredients>
					<div className={`${styles.order_item_price}`}>
						<p className={'text text_type_digits-default'}>{order_price}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</article>
		</Link>
	);
};
