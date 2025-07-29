import * as PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
	getBurgerIngredientsPrice,
	getBurgerIngredientsState,
} from '../../services/burger-ingredients/selectors.js';
import {
	addBurgerIngredient,
	addBurgerBun,
} from '../../services/burger-ingredients/reducers.js';
import { OrderDetails } from '../order-details/order-details.jsx';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	burgerGroupType,
	constructorIngredientLocation,
	DragItemTypes,
	modalTypes,
} from '../../config/consts.js';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient/burger-constructor-ingredient.jsx';

import { addOrder } from '../../services/orders/actions.js';

export const BurgerConstructor = ({ openModal }) => {
	const dispatch = useDispatch();
	const burgerIngredientsPrice = useSelector(getBurgerIngredientsPrice());

	const [, dropTargetIngredient] = useDrop({
		accept: DragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunTop] = useDrop({
		accept: DragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunBottom] = useDrop({
		accept: DragItemTypes.ingredient,
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

	const openCard = useCallback(() => {
		openModal({
			header: '',
			content: <OrderDetails></OrderDetails>,
			modalType: modalTypes.orderDetails,
		});
	}, [openModal]);

	const handleOrderButtonClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(addOrder());
		openCard();
	};

	return (
		<section className={`${styles.burger_constructor} pt-25`}>
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
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	openModal: PropTypes.func.isRequired,
};
