import * as PropTypes from 'prop-types';
import styles from './burger-group.module.css';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { burgerGroupTypeItemType } from '@utils/prop-types';
import { getIngredientsByType } from '../../../services/ingredients/selectors';

export const BurgerGroup = forwardRef(({ burgerGroupTypeItem }, ref) => {
	const ingredients = useSelector(getIngredientsByType(burgerGroupTypeItem));

	return (
		<div className={styles.card} ref={ref}>
			<p className={'text text_type_main-medium'}>{burgerGroupTypeItem.name}</p>
			<ul className={`${styles.list} mt-6 pb-10 ml-4`}>
				{ingredients.map((item) => (
					<li key={item._id}>
						<BurgerIngredient ingredient={item} />
					</li>
				))}
			</ul>
		</div>
	);
});

BurgerGroup.propTypes = {
	burgerGroupTypeItem: PropTypes.shape(burgerGroupTypeItemType),
};
