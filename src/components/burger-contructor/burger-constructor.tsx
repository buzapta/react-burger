import styles from './burger-constructor.module.css';
import { SyntheticEvent } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	getBurgerIngredientsPrice,
	getBurgerIngredientsState,
} from '../../services/burger-ingredients/selectors';
import {
	addBurgerIngredient,
	addBurgerBun,
	TBurgerIngredientsStore,
} from '../../services/burger-ingredients/reducers';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	addOrderPagePath,
	burgerGroupType,
	constructorLocation,
	dragItemTypes,
	addOrderButtonText,
} from '../../config/consts';
import { TIngredient } from '@utils/types';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient/burger-constructor-ingredient';

type TDropObject = {
	ingredient: TIngredient;
};

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const burgerIngredientsPrice: number = useSelector(
		getBurgerIngredientsPrice()
	);

	const [, dropTargetIngredient] = useDrop<TDropObject, unknown, unknown>({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunTop] = useDrop<TDropObject, unknown, unknown>({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const [, dropTargetBunBottom] = useDrop<TDropObject, unknown, unknown>({
		accept: dragItemTypes.ingredient,
		drop(ingredient) {
			handleDropIngredient(ingredient);
		},
	});

	const handleDropIngredient = (item: TDropObject) => {
		if (item.ingredient.type != burgerGroupType.bun.code) {
			dispatch(addBurgerIngredient(item.ingredient));
		} else {
			dispatch(addBurgerBun(item.ingredient));
		}
	};

	const { bun, ingredients }: TBurgerIngredientsStore = useSelector(
		getBurgerIngredientsState
	);

	const handleOrderButtonClick = (event: SyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
		navigate(addOrderPagePath, { state: { backgroundLocation: location } });
	};

	return (
		<section className={`${styles.burger_constructor} pt-25 ml-10`}>
			<div className={`${styles.bun} ml-4 pl-4`} ref={dropTargetBunTop}>
				<BurgerConstructorIngredient
					ingredient={bun}
					ingredientLocation={constructorLocation.LocationTop}
				/>
			</div>
			<ul className={`${styles.list} ml-4`} ref={dropTargetIngredient}>
				{ingredients.length == 0 && (
					<li className={`${styles.list_item} ml-6`}>
						<BurgerConstructorIngredient
							ingredientLocation={constructorLocation.LocationCenter}
						/>
					</li>
				)}
				{ingredients.map((ingredient, index) => (
					<li key={ingredient.key} className={styles.list_item}>
						<BurgerConstructorIngredient
							ingredient={ingredient}
							ingredientLocation={constructorLocation.LocationCenter}
							ingredientKey={ingredient.key}
							ingredientIndex={index}
						/>
					</li>
				))}
			</ul>
			<div className={`${styles.bun} ml-4 pl-4`} ref={dropTargetBunBottom}>
				<BurgerConstructorIngredient
					ingredient={bun}
					ingredientLocation={constructorLocation.LocationBottom}
				/>
			</div>
			<div className={`${styles.total} mt-10`}>
				<p className={'text text_type_digits-medium'}>
					{burgerIngredientsPrice}
				</p>
				<CurrencyIcon type='primary' />
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
