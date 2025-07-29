import styles from './burger-constructor.module.css';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	getBurgerIngredientsPrice,
	getBurgerIngredientsState,
} from '../../services/burger-ingredients/selectors';
import {
	addBurgerIngredient,
	addBurgerBun,
} from '../../services/burger-ingredients/reducers';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	addOrderPagePath,
	burgerGroupType,
	constructorIngredientLocation,
	dragItemTypes,
	addOrderButtonText,
} from '../../config/consts';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient/burger-constructor-ingredient';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const burgerIngredientsPrice = useSelector(getBurgerIngredientsPrice());

	const [, dropTargetIngredient] = useDrop({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunTop] = useDrop({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunBottom] = useDrop({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const handleDropIngredient = (item) => {
		if (item.ingredient.type != burgerGroupType.bun.code) {
			dispatch(addBurgerIngredient(item.ingredient));
		} else {
			dispatch(addBurgerBun(item.ingredient));
		}
	};

	const { bun, ingredients } = useSelector(getBurgerIngredientsState);

	const handleOrderButtonClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		navigate(addOrderPagePath, { state: { backgroundLocation: location } });
	};

	return (
		<section className={`${styles.burger_constructor} pt-25 ml-10`}>
			<div className={`${styles.bun} ml-4 pl-4`} ref={dropTargetBunTop}>
				<BurgerConstructorIngredient
					ingredient={bun}
					ingredientLocation={constructorIngredientLocation.BunTop}
				/>
			</div>
			<ul className={`${styles.list} ml-4`} ref={dropTargetIngredient}>
				{ingredients.length == 0 && (
					<li className={`${styles.list_item} ml-6`}>
						<BurgerConstructorIngredient
							ingredientLocation={constructorIngredientLocation.Ingredient}
						/>
					</li>
				)}
				{ingredients.map((ingredient, index) => (
					<li
						key={ingredient.key}
						className={styles.list_item}
						index={ingredient.key}>
						<BurgerConstructorIngredient
							ingredient={ingredient}
							ingredientLocation={constructorIngredientLocation.Ingredient}
							ingredientKey={ingredient.key}
							ingredientIndex={index}
						/>
					</li>
				))}
			</ul>
			<div className={`${styles.bun} ml-4 pl-4`} ref={dropTargetBunBottom}>
				<BurgerConstructorIngredient
					ingredient={bun}
					ingredientLocation={constructorIngredientLocation.BunBottom}
				/>
			</div>
			<div className={`${styles.total} mt-10`}>
				<p className={'text text_type_digits-medium'}>
					{burgerIngredientsPrice}
				</p>
				<CurrencyIcon />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOrderButtonClick}>
					{addOrderButtonText}
				</Button>
			</div>
		</section>
	);
};
