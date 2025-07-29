import * as PropTypes from 'prop-types';
import {
	constructorIngredientLocation,
	burgerGroupType,
} from '../config/consts';

export const ingredientPropType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
});

export const ingredientWithKeyPropType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		burgerGroupType.bun.code,
		burgerGroupType.main.code,
		burgerGroupType.sauce.code,
	]).isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
	key: PropTypes.string,
});

export const burgerGroupTypeItemType = {
	code: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export const constructorIngredientLocationPropType = {
	type: PropTypes.oneOf([
		constructorIngredientLocation.BunTop,
		constructorIngredientLocation.BunBottom,
		constructorIngredientLocation.Ingredient,
	]),
};
