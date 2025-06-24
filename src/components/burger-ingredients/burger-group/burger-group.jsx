import * as PropTypes from 'prop-types';
import styles from './burger-group.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient.jsx';
import {
	burgerGroupTypeItemType,
	ingredientPropType,
} from '@utils/prop-types.js';

export const BurgerGroup = ({ burgerGroupTypeItem, ingredients, openCard }) => {
	return (
		<div className={styles.card}>
			<p className={'text text_type_main-medium'}>{burgerGroupTypeItem.name}</p>
			<ul className={`${styles.list} mt-6 pb-10 ml-4`}>
				{ingredients.map((item) => (
					<li key={item._id}>
						{' '}
						<BurgerIngredient ingredient={item} openCard={openCard} />
					</li>
				))}
			</ul>
		</div>
	);
};

BurgerGroup.propTypes = {
	burgerGroupTypeItem: PropTypes.shape(burgerGroupTypeItemType),
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	openCard: PropTypes.func.isRequired,
};
