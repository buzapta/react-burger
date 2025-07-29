import * as PropTypes from 'prop-types';
import {
	ingredientWithKeyPropType,
	constructorIngredientLocationPropType,
} from '@utils/prop-types.js';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import styles from './burger-constructor-ingredient.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	removeBurgerIngredient,
	moveBurgerIngredient,
} from '../../../services/burger-ingredients/reducers';
import {
	burgerGroupType,
	burgerConstructorIngredientBlankText,
	burgerConstructorIngredientBlankImg,
	burgerConstructorBunBlankText,
	burgerConstructorBunBlankImg,
	constructorIngredientLocation,
	dragItemTypes,
} from '../../../config/consts';

export const BurgerConstructorIngredient = ({
	ingredient,
	ingredientLocation,
	ingredientKey,
	ingredientIndex,
}) => {
	const dispatch = useDispatch();
	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: dragItemTypes.constructor_ingredient,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.ingredientIndex;
			const hoverIndex = ingredientIndex;

			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
			item.ingredientIndex = hoverIndex;
		},
	});

	const moveCard = (dragIndex, hoverIndex) => {
		dispatch(
			moveBurgerIngredient({ toIndex: dragIndex, fromIndex: hoverIndex })
		);
	};

	const [, drag] = useDrag({
		type: dragItemTypes.constructor_ingredient,
		item: () => {
			return { ingredientKey, ingredientIndex };
		},
	});

	const handleRemoveIngredient = (event) => {
		dispatch(
			removeBurgerIngredient(
				event.target.closest('article').getAttribute('index')
			)
		);
	};

	if (!ingredient) {
		if (ingredientLocation === constructorIngredientLocation.BunTop) {
			return (
				<article className={styles.content}>
					<ConstructorElement
						type={ingredientLocation}
						isLocked={true}
						text={burgerConstructorBunBlankText}
						thumbnail={burgerConstructorBunBlankImg}
					/>
				</article>
			);
		}

		if (ingredientLocation === constructorIngredientLocation.BunBottom) {
			return (
				<article className={styles.content}>
					<ConstructorElement
						type={ingredientLocation}
						isLocked={true}
						text={burgerConstructorBunBlankText}
						thumbnail={burgerConstructorBunBlankImg}
					/>
				</article>
			);
		}

		if (ingredientLocation === constructorIngredientLocation.Ingredient)
			return (
				<article className={styles.content}>
					<ConstructorElement
						text={burgerConstructorIngredientBlankText}
						thumbnail={burgerConstructorIngredientBlankImg}
					/>
				</article>
			);
	}

	if (ingredient.type === burgerGroupType.bun.code) {
		return (
			<article className={styles.content}>
				<ConstructorElement
					type={ingredientLocation}
					isLocked={true}
					text={`${ingredient.name}`}
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			</article>
		);
	}
	drag(drop(ref));

	return (
		<article
			className={styles.content}
			ref={ref}
			data-handler-id={handlerId}
			index={ingredient.key}>
			<DragIcon />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleRemoveIngredient}
			/>
		</article>
	);
};

BurgerConstructorIngredient.propTypes = {
	ingredient: ingredientWithKeyPropType,
	ingredientLocation: constructorIngredientLocationPropType.type,
	ingredientKey: PropTypes.string,
	ingredientIndex: PropTypes.number,
};
