import styles from './burger-group.module.css';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
// @ts-expect-error "sprint5"
import { getIngredientsByType } from '../../../services/ingredients/selectors';
import { TBurgerGroupTypeItem, TIngredient } from '@utils/types';

type Tprops = { burgerGroupTypeItem: TBurgerGroupTypeItem };

export const BurgerGroup = forwardRef<HTMLDivElement, Tprops>(
	(props: Tprops, ref): React.JSX.Element => {
		const ingredients: TIngredient[] = useSelector(
			getIngredientsByType(props.burgerGroupTypeItem)
		);

		return (
			<div className={styles.card} ref={ref}>
				<p className={'text text_type_main-medium'}>
					{props.burgerGroupTypeItem.name}
				</p>
				<ul className={`${styles.list} mt-6 pb-10 ml-4`}>
					{ingredients.map((item) => (
						<li key={item._id}>
							<BurgerIngredient ingredient={item} />
						</li>
					))}
				</ul>
			</div>
		);
	}
);
