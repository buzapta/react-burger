import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useContext } from 'react';
import { TIngredient, TmodalSetHeader, TOrderItem } from '@/utils/types';
import {
	modalHeaderContext,
	order_item_status,
	order_item_status_name,
	orderInfoLoadingTitle,
	orderInfoErrorTitle,
	order_info_ingredients_title,
} from '../../config/consts';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FindOrderInfoByNumber } from '@/services/orders-info/selectors';
import { getOrderInfoThunk } from '@/services/orders/actions';
import { Error } from '../notification/error';
import {
	getIngredientsByIdArray,
	getIngredientsPriceByIdArray,
} from '@/services/ingredients/selectors';
import { clearOrderInfo, getOrdersInfo } from '@/services/orders-info/reducers';
import { Preloader } from '../preloader/preloader';
import { OrderItemIngredients } from './order-info-ingredients/order-item-ingredients';

export const OrderInfo = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const params = useParams();
	const number = params.number;
	const { setHeader } = useContext<TmodalSetHeader>(modalHeaderContext);
	const { loading_info } = useSelector(getOrdersInfo);

	const order: TOrderItem | null = FindOrderInfoByNumber(number ? +number : 0);

	const order_ingredients: TIngredient[] = useSelector(
		getIngredientsByIdArray(order ? order.ingredients : [])
	);

	const order_price = useSelector(
		getIngredientsPriceByIdArray(order ? order.ingredients : [])
	);

	useEffect(() => {
		dispatch(clearOrderInfo());
	}, [dispatch]);

	useEffect(() => {
		if (!order && number) {
			dispatch(getOrderInfoThunk(+number));
		}
	}, [dispatch, number, order]);

	useEffect(() => {
		if (loading_info) {
			setHeader(
				<p className={'text text_type_main-medium'}>{orderInfoLoadingTitle}</p>
			);
		} else if (order) {
			setHeader(<p className={'text text_type_digits-default'}>#{number}</p>);
		} else {
			setHeader(
				<p className={'text text_type_main-medium'}>{orderInfoErrorTitle}</p>
			);
		}
	}, [setHeader, order, loading_info, number]);

	if (!number) {
		return (
			<div className={`${styles.error}`}>
				<Error>{'Номер заказа не определен!'}</Error>
			</div>
		);
	} else if (loading_info) {
		return (
			<div className={`${styles.loader}`}>
				<Preloader />
			</div>
		);
	} else if (order) {
		return (
			<div className={`${styles.wrapper}`}>
				<article
					className={`${styles.order_info} text text_type_main-medium ml-10 mr-10 mb-10`}>
					<p className={`${styles.name} text text_type_main-medium mt-10`}>
						{order.name}
					</p>
					<p
						className={
							`${styles.status} text text_type_main-default mt-3` +
							(order.status == order_item_status.done
								? ` ${styles.item_done}`
								: '')
						}>
						{order_item_status_name[order.status]}
					</p>
					<p className={`${styles.name} text text_type_main-medium mt-15 mb-6`}>
						{order_info_ingredients_title}
					</p>
					<OrderItemIngredients ingredients={order_ingredients} />
					<div className={`${styles.totals} mt-6`}>
						<FormattedDate
							className={`${styles.totals_item} text text_type_main-default text_color_inactive`}
							date={new Date(order.createdAt)}
						/>
						<div className={`${styles.order_item_price}`}>
							<p className={'text text_type_digits-default'}>{order_price}</p>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</article>
			</div>
		);
	} else
		return (
			<div className={`${styles.error}`}>
				<Error>{'Заказ не найден'}</Error>
			</div>
		);
};
