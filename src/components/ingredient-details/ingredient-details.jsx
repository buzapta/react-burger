import { useCallback, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { getIngredientById } from '../../services/ingredients/selectors';
import {
	showIngredient,
	clearIngredient,
} from '../../services/ingredient/reducers';
import {
	modalHeaderContext,
	ingredientsDetailTitle,
	ingredientNotFoundError,
	ingredientsDetailCaloriesTip,
	ingredientsDetailProteinsTip,
	ingredientsDetailFatTip,
	ingredientsDetailCarbohydratesTip,
} from '../../config/consts';

export const IngredientDetails = () => {
	const { _id } = useParams();
	const { setHeader } = useContext(modalHeaderContext);

	const ingredient = useSelector(getIngredientById(_id));
	const dispatch = useDispatch();

	const handleClose = useCallback(() => {
		dispatch(clearIngredient());
	}, [dispatch]);

	useEffect(() => {
		setHeader(ingredientsDetailTitle);
		if (ingredient) {
			dispatch(showIngredient(ingredient));
		}
		return handleClose;
	}, [dispatch, handleClose, setHeader, ingredient]);

	if (!ingredient) {
		return <>{ingredientNotFoundError}</>;
	}

	return (
		<div>
			<article className={styles.ingredient_details}>
				<img
					className={styles.image}
					src={ingredient.image_large}
					alt={ingredient.name}
				/>
				<p className={`${styles.name} text text_type_main-medium mt-4`}>
					{ingredient.name}
				</p>
				<ul className={`${styles.attributes} mt-8 mb-15`}>
					<li className={`${styles.attribute}`}>
						<p className={'text text_type_main-small text_color_inactive'}>
							{ingredientsDetailCaloriesTip}
						</p>
						<p className={'text text_type_digits-default text_color_inactive'}>
							{ingredient.calories}
						</p>
					</li>
					<li className={`${styles.attribute}`}>
						<p className={'text text_type_main-small text_color_inactive'}>
							{ingredientsDetailProteinsTip}
						</p>
						<p className={'text text_type_digits-default text_color_inactive'}>
							{ingredient.proteins}
						</p>
					</li>
					<li className={`${styles.attribute}`}>
						<p className={'text text_type_main-small text_color_inactive'}>
							{ingredientsDetailFatTip}
						</p>
						<p className={'text text_type_digits-default text_color_inactive'}>
							{ingredient.fat}
						</p>
					</li>
					<li className={`${styles.attribute}`}>
						<p className={'text text_type_main-small text_color_inactive'}>
							{ingredientsDetailCarbohydratesTip}
						</p>
						<p className={'text text_type_digits-default text_color_inactive'}>
							{ingredient.carbohydrates}
						</p>
					</li>
				</ul>
			</article>
		</div>
	);
};
