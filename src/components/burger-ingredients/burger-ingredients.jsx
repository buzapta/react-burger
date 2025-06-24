import * as PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { BurgerGroup } from './burger-group/burger-group.jsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	burgerGroupType,
	burgerGroupType_default,
	burgerIngredientsTitle,
	ingredientsDetailTitle,
} from '../../config/consts.js';
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx';

export const BurgerIngredients = ({ ingredients, openModal }) => {
	const [currentGroupType, setCurrentGroupType] = useState(
		burgerGroupType_default
	);

	useEffect(() => {
		document.getElementById(currentGroupType).scrollIntoView();
	}, [currentGroupType]);

	const openCard = useCallback(
		(ingredient) => {
			openModal({
				header: ingredientsDetailTitle,
				content: (
					<IngredientDetails ingredient={ingredient}></IngredientDetails>
				),
			});
		},
		[openModal]
	);

	return (
		<section className={styles.burger_ingredients}>
			<h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
				{burgerIngredientsTitle}
			</h1>
			<nav>
				<ul className={`${styles.menu} mb-10`}>
					<Tab
						value={burgerGroupType.bun.code}
						active={currentGroupType === burgerGroupType.bun.code}
						onClick={() => {
							setCurrentGroupType(burgerGroupType.bun.code);
						}}>
						{burgerGroupType.bun.name}
					</Tab>
					<Tab
						value={burgerGroupType.sauce.code}
						active={currentGroupType === burgerGroupType.sauce.code}
						onClick={() => {
							setCurrentGroupType(burgerGroupType.sauce.code);
						}}>
						{burgerGroupType.sauce.name}
					</Tab>
					<Tab
						value={burgerGroupType.main.code}
						active={currentGroupType === burgerGroupType.main.code}
						onClick={() => {
							setCurrentGroupType(burgerGroupType.main.code);
						}}>
						{burgerGroupType.main.name}
					</Tab>
				</ul>
			</nav>
			<ul className={`${styles.list}`}>
				<li id={burgerGroupType.bun.code} key={burgerGroupType.bun.code}>
					<BurgerGroup
						burgerGroupTypeItem={burgerGroupType.bun}
						ingredients={ingredients.filter(
							(ingredient) => ingredient.type === burgerGroupType.bun.code
						)}
						openCard={openCard}
					/>
				</li>
				<li id={burgerGroupType.sauce.code} key={burgerGroupType.sauce.code}>
					<BurgerGroup
						burgerGroupTypeItem={burgerGroupType.sauce}
						ingredients={ingredients.filter(
							(ingredient) => ingredient.type === burgerGroupType.sauce.code
						)}
						openCard={openCard}
					/>
				</li>
				<li id={burgerGroupType.main.code} key={burgerGroupType.main.code}>
					<BurgerGroup
						burgerGroupTypeItem={burgerGroupType.main}
						ingredients={ingredients.filter(
							(ingredient) => ingredient.type === burgerGroupType.main.code
						)}
						openCard={openCard}
					/>
				</li>
			</ul>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	openModal: PropTypes.func.isRequired,
};
