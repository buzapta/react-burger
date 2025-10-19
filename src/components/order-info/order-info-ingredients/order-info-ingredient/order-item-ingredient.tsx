import styles from './order-item-ingredient.module.css';
import { TGroupedIngredient } from '@utils/types';
import { OrderItemIngredientCircle } from '@/components/order-item-ingredient-circle/order-item-ingredient-circle';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Tprops = {
	groupedIngredient: TGroupedIngredient;
};

export const OrderItemIngredient = (props: Tprops): React.JSX.Element => {
	const groupedIngredient = props.groupedIngredient;

	return (
		<div className={`${styles.order_item_ingredient}`}>
			<div>
				<OrderItemIngredientCircle ingredient={groupedIngredient.ingredient} />
			</div>
			<p className={`${styles.order_item_name} text text_type_main-default`}>
				{groupedIngredient.ingredient.name}
			</p>
			<div className={`${styles.order_item_countprice}`}>
				<p className={'text text_type_digits-default'}>
					{groupedIngredient.count}
				</p>
				<p className={'text text_type_digits-default'}>x</p>
				<p className={'text text_type_digits-default'}>
					{groupedIngredient.ingredient.price}
				</p>
				<CurrencyIcon type='primary' />
			</div>
		</div>
	);
};
