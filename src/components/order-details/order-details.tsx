import styles from './order-details.module.css';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import img_order_details_done from '../../images/order_details_done.png';
import { Preloader } from '@/components/preloader/preloader';
import { addOrder } from '../../services/orders/actions';
import { clearBurgerIngredients } from '../../services/burger-ingredients/reducers';
import { clearOrder, getOrders } from '../../services/orders/reducers';
import {
	modalHeaderContext,
	addOrderLoadingTitle,
	addOrderDoneTitle,
	addOrderErrorTitle,
} from '../../config/consts';
import { Error } from '../notification/error';
import { TmodalSetHeader } from '@/utils/types';

export const OrderDetails = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { setHeader } = useContext<TmodalSetHeader>(modalHeaderContext);
	const { order, loading, error } = useSelector(getOrders);

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
			setHeader(
				<p className={'text text_type_main-large'}>{addOrderLoadingTitle}</p>
			);
		} else if (order) {
			setHeader(
				<p className={'text text_type_main-large'}>{addOrderDoneTitle}</p>
			);
		} else {
			setHeader(
				<p className={'text text_type_main-large'}>{addOrderErrorTitle}</p>
			);
		}
	}, [setHeader, order, loading]);

	if (loading) {
		return (
			<article className={`${styles.loader}`}>
				<Preloader />
			</article>
		);
	} else if (!loading && error) {
		return (
			<article className={`${styles.error}`}>
				<Error>{error}</Error>
			</article>
		);
	} else if (order) {
		return (
			<div className={`${styles.wrapper}`}>
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
			</div>
		);
	} else return <></>;
};
