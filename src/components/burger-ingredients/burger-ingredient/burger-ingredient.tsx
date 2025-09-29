import styles from './burger-ingredient.module.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
// @ts-expect-error "sprint5"
import { getBurgerIngredientCount } from '../../../services/burger-ingredients/selectors';
import { dragItemTypes, ingredientsPagePath } from '../../../config/consts';
import { TIngredient } from '@utils/types';

type Tprops = { ingredient: TIngredient };

export const BurgerIngredient = (props: Tprops): React.JSX.Element => {
	const location = useLocation();
	const ingredient = props.ingredient;
	const burgerIngredientCount = useSelector(
		getBurgerIngredientCount(ingredient._id)
	);
	const [, dragRef] = useDrag({
		type: dragItemTypes.ingredient,
		item: { ingredient },
	});

	return (
		<article className={styles.burger_ingredient} ref={dragRef}>
			<Link
				key={ingredient._id}
				className={styles.burger_link}
				to={`${ingredientsPagePath}/${ingredient._id}`}
				state={{ backgroundLocation: location }}>
				<div className={styles.counter}>
					<Counter
						// @ts-expect-error "sprint5"
						count={burgerIngredientCount}
						size='default'
						extraClass='m-1'
					/>
				</div>
				<img src={ingredient.image} alt={ingredient.name} />
				<div className={`${styles.price} mt-1`}>
					<p className={'text text_type_digits-default'}>{ingredient.price}</p>
					<CurrencyIcon type='primary' />
				</div>
				<p className={'text text_type_main-default mt-1'}>{ingredient.name}</p>
			</Link>
		</article>
	);
};
