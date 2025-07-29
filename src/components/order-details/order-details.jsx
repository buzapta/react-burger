import styles from './order-details.module.css';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img_order_details_done from '../../images/order_details_done.png';
import { getOrderState } from '../../services/orders/selectors';
import { Preloader } from '@components/preloader/preloader';
import { addOrder } from '../../services/orders/actions';
import { clearBurgerIngredients } from '../../services/burger-ingredients/reducers';
import { clearOrder } from '../../services/orders/reducers';
import {
	modalHeaderContext,
	addOrderLoadingTitle,
	addOrderDoneTitle,
	addOrderErrorTitle,
} from '../../config/consts';
import { Error } from '../notification/error';
export const OrderDetails = () => {
	const dispatch = useDispatch();
	const { setHeader } = useContext(modalHeaderContext);
	const { order, loading, error } = useSelector(getOrderState);

	useEffect(() => {
		dispatch(addOrder());
		return () => {
			dispatch(clearOrder());
		};
	}, [dispatch]);

	useEffect(() => {
		return () => {
			if (order) {
				dispatch(clearBurgerIngredients());
			}
		};
	}, [dispatch, order]);

	useEffect(() => {
		if (loading) {
			setHeader(addOrderLoadingTitle);
		} else if (order) {
			setHeader(addOrderDoneTitle);
		} else {
			setHeader(addOrderErrorTitle);
		}
	}, [setHeader, order, loading]);

	if (loading) {
		return <Preloader />;
	}

	if (!loading && error) {
		return (
			<article className={`${styles.order_details}`}>
				<Error>{error}</Error>
			</article>
		);
	}

	if (order) {
		return (
			<article className={`${styles.order_details}`}>
				<p className={' text text_type_digits-large'}>{order.order.number}</p>
				<p className={'text text text_type_main-medium mt-8'}>
					идентификатор заказа
				</p>
				<img src={img_order_details_done} className={'mt-15'} alt='' />
				<p className={'text text text_type_main-default mt-15'}>
					Ваш заказ начали готовить
				</p>
				<p
					className={
						'text text_type_main-default text_color_inactive mt-2 mb-30'
					}>
					Дождитесь готовности на орбитальной станции
				</p>
			</article>
		);
	}
};
