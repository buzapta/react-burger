import styles from './order-item-ingredients.module.css';
import { TGroupedIngredient, TIngredient } from '@utils/types';
import { OrderItemIngredient } from './order-info-ingredient/order-item-ingredient';
import { useMemo } from 'react';

type Tprops = {
	ingredients: TIngredient[];
};

export const OrderItemIngredients = (props: Tprops): React.JSX.Element => {
	const ingredients = props.ingredients;

	const getMappedGroupedIngredients = (ingredients: TIngredient[]) => {
		const new_mapped_ingredients = new Map<string, TGroupedIngredient>();
		ingredients.forEach((item) => {
			const mapped_item = new_mapped_ingredients.get(item._id);
			if (!mapped_item) {
				new_mapped_ingredients.set(item._id, { ingredient: item, count: 1 });
			} else {
				mapped_item['count'] = mapped_item['count'] + 1;
			}
		});
		return Array.from(new_mapped_ingredients, ([, value]) => value);
	};

	const groupedIngredients = useMemo(
		() => getMappedGroupedIngredients(ingredients),
		[ingredients]
	);

	return (
		<ul className={`${styles.order_item_ingredients}`}>
			{groupedIngredients.map((groupedIngredient, index) => {
				{
					return (
						<li key={index}>
							<OrderItemIngredient groupedIngredient={groupedIngredient} />
						</li>
					);
				}
			})}
		</ul>
	);
};
