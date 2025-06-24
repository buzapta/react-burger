import styles from './order-details.module.css';
import img_order_details_done from '../../images/order_details_done.png';

export const OrderDetails = () => {
	return (
		<article className={`${styles.order_details}`}>
			<p className={' text text_type_digits-large'}>034536</p>
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
};
