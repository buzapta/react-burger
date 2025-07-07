import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import styles from './burger-ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { showIngredient } from '../../../services/ingredient/reducers.js';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getBurgerIngredientCount } from '../../../services/burger-ingredients/selectors.js';
import { DragItemTypes } from '../../../config/consts.js';

export const BurgerIngredient = ({ ingredient, openCard }) => {
	const dispatch = useDispatch();
	const burgerIngredientCount = useSelector(
		getBurgerIngredientCount(ingredient._id)
	);
	const [, dragRef] = useDrag({
		type: DragItemTypes.ingredient,
		item: { ingredient },
	});
	const handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(showIngredient(ingredient));
		openCard(ingredient);
	};

	return (
		<>
			<button
				className={styles.burger_ingredient}
				onClick={handleClick}
				ref={dragRef}>
				<div className={styles.counter}>
					<Counter
						count={burgerIngredientCount}
						size='default'
						extraClass='m-1'
					/>
				</div>
				<img src={ingredient.image} alt={ingredient.name} />
				<div className={`${styles.price} mt-1`}>
					<p className={'text text_type_digits-default'}>{ingredient.price}</p>
					<CurrencyIcon />
				</div>
				<p className={'text text_type_main-default mt-1'}>{ingredient.name}</p>
			</button>
		</>
	);
};

BurgerIngredient.propTypes = {
	ingredient: ingredientPropType.isRequired,
	openCard: PropTypes.func.isRequired,
};
