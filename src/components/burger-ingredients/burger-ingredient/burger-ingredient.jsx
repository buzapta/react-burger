import * as PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredient = ({ ingredient, openCard }) => {
	const handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		openCard(ingredient);
	};
	return (
		<button className={styles.burger_ingredient} onClick={handleClick}>
			<div className={styles.counter}>
				<Counter count={1} size='default' extraClass='m-1' />
			</div>
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.price} mt-1`}>
				<p className={'text text_type_digits-default'}>{ingredient.price}</p>
				<CurrencyIcon />
			</div>
			<p className={'text text_type_main-default mt-1'}>{ingredient.name}</p>
		</button>
	);
};

BurgerIngredient.propTypes = {
	ingredient: ingredientPropType.isRequired,
	openCard: PropTypes.func.isRequired,
};
