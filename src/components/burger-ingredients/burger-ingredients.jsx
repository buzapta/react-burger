import styles from './burger-ingredients.module.css';
import { useState, useRef } from 'react';
import { BurgerGroup } from './burger-group/burger-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	burgerGroupType,
	burgerGroupType_default,
	burgerIngredientsHeader,
} from '../../config/consts';

export const BurgerIngredients = () => {
	const bunGroupRef = useRef([]);
	const mainGroupRef = useRef([]);
	const sauceGroupRef = useRef([]);

	const [currentGroupType, setCurrentGroupType] = useState(
		burgerGroupType_default
	);

	const handleGroupScroll = () => {
		let bunDistance = Math.abs(
			document.getElementById('burger_ingredients_menu').getBoundingClientRect()
				.bottom - bunGroupRef.current.getBoundingClientRect().top
		);
		let sauceDistance = Math.abs(
			document.getElementById('burger_ingredients_menu').getBoundingClientRect()
				.bottom - sauceGroupRef.current.getBoundingClientRect().top
		);
		let mainDistance = Math.abs(
			document.getElementById('burger_ingredients_menu').getBoundingClientRect()
				.bottom - mainGroupRef.current.getBoundingClientRect().top
		);
		let minDistance = Math.min(bunDistance, sauceDistance, mainDistance);

		switch (minDistance) {
			case bunDistance:
				setCurrentGroupType(burgerGroupType.bun.code);
				break;
			case sauceDistance:
				setCurrentGroupType(burgerGroupType.sauce.code);
				break;
			case mainDistance:
				setCurrentGroupType(burgerGroupType.main.code);
				break;
		}
	};

	const handleMenuClick = (event) => {
		document.getElementById(event).scrollIntoView();
	};

	return (
		<section className={styles.burger_ingredients}>
			<h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
				{burgerIngredientsHeader}
			</h1>
			<nav>
				<ul className={`${styles.menu} mb-10`} id='burger_ingredients_menu'>
					<Tab
						value={burgerGroupType.bun.code}
						active={currentGroupType === burgerGroupType.bun.code}
						onClick={handleMenuClick}>
						{burgerGroupType.bun.name}
					</Tab>
					<Tab
						value={burgerGroupType.sauce.code}
						active={currentGroupType === burgerGroupType.sauce.code}
						onClick={handleMenuClick}>
						{burgerGroupType.sauce.name}
					</Tab>
					<Tab
						value={burgerGroupType.main.code}
						active={currentGroupType === burgerGroupType.main.code}
						onClick={handleMenuClick}>
						{burgerGroupType.main.name}
					</Tab>
				</ul>
			</nav>
			<ul className={`${styles.list}`} onScroll={handleGroupScroll}>
				<li id={burgerGroupType.bun.code} key={burgerGroupType.bun.code}>
					<BurgerGroup
						ref={bunGroupRef}
						burgerGroupTypeItem={burgerGroupType.bun}
					/>
				</li>
				<li id={burgerGroupType.sauce.code} key={burgerGroupType.sauce.code}>
					<BurgerGroup
						ref={sauceGroupRef}
						burgerGroupTypeItem={burgerGroupType.sauce}
					/>
				</li>
				<li id={burgerGroupType.main.code} key={burgerGroupType.main.code}>
					<BurgerGroup
						ref={mainGroupRef}
						burgerGroupTypeItem={burgerGroupType.main}
					/>
				</li>
			</ul>
		</section>
	);
};
