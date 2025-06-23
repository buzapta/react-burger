import * as PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { useCallback } from 'react';
import { ingredientPropType } from '@utils/prop-types.js';
import { burgerGroupType } from '../../config/consts.js';
import { OrderDetails } from '../order-details/order-details.jsx';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients, openModal }) => {
	let ingredient_bun = ingredients.find(
		(ingredient) => ingredient.type === burgerGroupType.bun.code
	);

	const openCard = useCallback(() => {
		openModal({ header: '', content: <OrderDetails></OrderDetails> });
	}, [openModal]);

	const handleOrderButtonClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		openCard();
	};

	return (
		<section className={`${styles.burger_constructor} pt-25`}>
			{ingredient_bun ? (
				<div className={'ml-4 pl-4'}>
					<article className={styles.item}>
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${ingredient_bun.name} (верх)`}
							price={200}
							thumbnail={ingredient_bun.image}
						/>
					</article>
				</div>
			) : null}
			<ul className={`${styles.list} ml-4`}>
				{ingredients
					.filter((ingredient) => ingredient.type != burgerGroupType.bun.code)
					.map((item) => (
						<li key={item._id} className={styles.list_item}>
							<DragIcon />
							<article className={styles.item}>
								<ConstructorElement
									text={item.name}
									price={item.price}
									thumbnail={item.image}
								/>
							</article>
						</li>
					))}
			</ul>
			{ingredient_bun ? (
				<div className={'ml-4 pl-4'}>
					<article className={styles.item}>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${ingredient_bun.name} (верх)`}
							price={200}
							thumbnail={ingredient_bun.image}
						/>
					</article>
				</div>
			) : null}
			<div className={`${styles.total} mt-10`}>
				<p className={'text text_type_digits-medium'}>610</p>
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
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	openModal: PropTypes.func.isRequired,
};
