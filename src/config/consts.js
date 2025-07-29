import transparent_img from '../images/transparent.png';

export const modalTypes = {
	ingredientsDetail: 'ingredientsDetail',
	orderDetails: 'orderDetails',
};

export const constructorIngredientLocation = {
	BunTop: 'top',
	BunBottom: 'bottom',
	Ingredient: 'center',
};

export const burgerGroupType_default = 'bun';
export const burgerGroupType = {
	bun: {
		code: 'bun',
		name: 'Булки',
	},
	main: {
		code: 'main',
		name: 'Начинки',
	},
	sauce: {
		code: 'sauce',
		name: 'Соусы',
	},
};

export const DragItemTypes = {
	ingredient: 'ingredient',
	constructor_ingredient: 'constructor_ingredient',
};

export const burgerIngredientsTitle = 'Соберите бургер';
export const ingredientsDetailTitle = 'Детали ингредиента';
export const burgerConstructorIngredientBlankText = 'Выберите ингредиенты';
export const burgerConstructorIngredientBlankImg = transparent_img;
export const burgerConstructorBunBlankText = 'Выберите булки';
export const burgerConstructorBunBlankImg = transparent_img;
