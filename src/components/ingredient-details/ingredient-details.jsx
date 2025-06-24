import styles from './ingredient-details.module.css';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientDetails = ({ ingredient }) => {
	return (
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
						Каллории, ккал
					</p>
					<p className={'text text_type_digits-default text_color_inactive'}>
						{ingredient.calories}
					</p>
				</li>
				<li className={`${styles.attribute}`}>
					<p className={'text text_type_main-small text_color_inactive'}>
						Белки, г
					</p>
					<p className={'text text_type_digits-default text_color_inactive'}>
						{ingredient.proteins}
					</p>
				</li>
				<li className={`${styles.attribute}`}>
					<p className={'text text_type_main-small text_color_inactive'}>
						Жиры, г
					</p>
					<p className={'text text_type_digits-default text_color_inactive'}>
						{ingredient.fat}
					</p>
				</li>
				<li className={`${styles.attribute}`}>
					<p className={'text text_type_main-small text_color_inactive'}>
						Углеводы, г
					</p>
					<p className={'text text_type_digits-default text_color_inactive'}>
						{ingredient.carbohydrates}
					</p>
				</li>
			</ul>
		</article>
	);
};

IngredientDetails.propTypes = {
	ingredient: ingredientPropType.isRequired,
};
