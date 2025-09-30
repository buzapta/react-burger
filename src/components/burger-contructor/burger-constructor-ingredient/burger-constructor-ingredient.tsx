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
	// @ts-expect-error "sprint5"
} from '../../../services/burger-ingredients/reducers';
import {
	burgerGroupType,
	burgerConstructorIngredientBlankText,
	burgerConstructorIngredientBlankImg,
	burgerConstructorBunBlankText,
	burgerConstructorBunBlankImg,
	constructorLocation,
	dragItemTypes,
} from '../../../config/consts';
import { TIngredientWithKey } from '@/utils/types';
import { Identifier } from 'dnd-core';

type TProps = {
	ingredient?: TIngredientWithKey;
	ingredientLocation:
		| constructorLocation.LocationTop
		| constructorLocation.LocationCenter
		| constructorLocation.LocationBottom;
	ingredientKey?: string;
	ingredientIndex?: number;
};

type TDragObject = {
	ingredientKey: string | undefined;
	ingredientIndex: number | undefined;
};

type TDropCollectedProps = {
	handlerId: Identifier | null;
};

export const BurgerConstructorIngredient = (
	props: TProps
): React.JSX.Element => {
	const ingredient = props.ingredient;
	const ingredientLocation = props.ingredientLocation;
	const ingredientKey = props.ingredientKey;
	const ingredientIndex = props.ingredientIndex;

	const dispatch = useDispatch();
	const ref = useRef<HTMLElement | null>(null);
	const [{ handlerId }, drop] = useDrop<
		TDragObject,
		unknown,
		TDropCollectedProps
	>({
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

			if (
				hoverIndex === undefined ||
				dragIndex === undefined ||
				dragIndex === hoverIndex
			) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();

			if (!clientOffset) {
				return;
			}
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

	const moveCard = (dragIndex: number, hoverIndex: number) => {
		dispatch(
			moveBurgerIngredient({ toIndex: dragIndex, fromIndex: hoverIndex })
		);
	};

	const [, drag] = useDrag<TDragObject, unknown, unknown>({
		type: dragItemTypes.constructor_ingredient,
		item: () => {
			return { ingredientKey, ingredientIndex };
		},
	});

	// @ts-expect-error "в компоненте ConstructorElement нет event в типе"
	const handleRemoveIngredient = (event) => {
		dispatch(
			removeBurgerIngredient(event.target.closest('article').getAttribute('id'))
		);
	};

	if (!ingredient) {
		if (ingredientLocation === constructorLocation.LocationTop) {
			return (
				<article className={styles.content}>
					<ConstructorElement
						price={0}
						type={ingredientLocation}
						isLocked={true}
						text={burgerConstructorBunBlankText}
						thumbnail={burgerConstructorBunBlankImg}
					/>
				</article>
			);
		}

		if (ingredientLocation === constructorLocation.LocationBottom) {
			return (
				<article className={styles.content}>
					<ConstructorElement
						price={0}
						type={ingredientLocation}
						isLocked={true}
						text={burgerConstructorBunBlankText}
						thumbnail={burgerConstructorBunBlankImg}
					/>
				</article>
			);
		}

		if (ingredientLocation === constructorLocation.LocationCenter)
			return (
				<article className={styles.content}>
					<ConstructorElement
						price={0}
						text={burgerConstructorIngredientBlankText}
						thumbnail={burgerConstructorIngredientBlankImg}
					/>
				</article>
			);
	}

	if (ingredient)
		if (ingredient.type === burgerGroupType.bun.code) {
			return (
				<article className={styles.content}>
					<ConstructorElement
						isLocked={true}
						text={`${ingredient?.name ?? ''}`}
						price={ingredient?.price ?? 0}
						thumbnail={ingredient?.image ?? ''}
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
			id={ingredient?.key ?? undefined}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient?.name ?? ''}
				price={ingredient?.price ?? 0}
				thumbnail={ingredient?.image ?? ''}
				// @ts-expect-error "в компоненте ConstructorElement нет event в типе"
				handleClose={handleRemoveIngredient}
			/>
		</article>
	);
};
