import styles from './order-item-ingredients.module.css';
import { TIngredient } from '@utils/types';
import { order_item_image_gap, order_item_max_count } from '@/config/consts';
import { OrderItemIngredientCircle } from '@/components/order-item-ingredient-circle/order-item-ingredient-circle';
type Tprops = { order_ingredients: TIngredient[] };

export const OrderItemIngredients = (props: Tprops): React.JSX.Element => {
	const order_ingredients = props.order_ingredients;
	const order_ingredients_count = order_ingredients.length;
	const order_ingredients_visible = order_ingredients.slice(
		0,
		order_item_max_count
	);
	const order_ingredients_visible_count = order_ingredients_visible.length;
	const order_ingredients_extra_count =
		order_ingredients_count - order_ingredients_visible_count;

	return (
		<div className={`${styles.order_item_ingredients}`}>
			<ul className={`${styles.order_item_images}`}>
				{order_ingredients_visible.map((_, index, order_ingredients_arr) => {
					const reverse_index = order_ingredients_visible_count - index - 1;
					const ingredient = order_ingredients_arr[reverse_index];
					const garyed = index === 0 ? true : false;
					const text_overlay =
						index === 0 && order_ingredients_extra_count > 0
							? '+' + order_ingredients_extra_count
							: '';

					{
						return (
							<li
								key={reverse_index}
								className={`${styles.order_item_wrap}`}
								style={{
									left: `${reverse_index * order_item_image_gap}px`,
								}}>
								<OrderItemIngredientCircle
									ingredient={ingredient}
									garyed={garyed}
									text_overlay={text_overlay}
								/>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};
