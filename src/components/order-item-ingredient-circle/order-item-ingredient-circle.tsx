import styles from './order-item-ingredient-circle.module.css';
import { TIngredient } from '@utils/types';

type Tprops = {
	ingredient: TIngredient;
	garyed?: boolean;
	text_overlay?: string;
};

export const OrderItemIngredientCircle = (props: Tprops): React.JSX.Element => {
	const ingredient = props.ingredient;
	const garyed = props.garyed ? props.garyed : false;
	const text_overlay = props.text_overlay;
	const opacity = garyed ? 0.6 : 1;

	return (
		<div className={`${styles.order_item_inner}`}>
			<div
				className={`${styles.order_item_image}`}
				style={{ opacity: `${opacity}` }}>
				<img
					className={`${styles.img}`}
					src={ingredient.image}
					alt={ingredient.name}
				/>
			</div>
			{text_overlay && (
				<div className={`${styles.order_item_count}`}>
					<p className={'text text_type_digits-default'}>{text_overlay}</p>
				</div>
			)}
		</div>
	);
};
