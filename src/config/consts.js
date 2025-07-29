import { createContext } from 'react';
import transparent_img from '../images/transparent.png';

export const modalHeaderContext = createContext({
	setHeader: () => {},
});

export const loginPagePath = '/login';
export const registerPagePath = '/register';
export const forgotPasswordPagePath = '/forgot-password';
export const resetPasswordPagePath = '/reset-password';
export const ingredientsPagePath = '/ingredients';
export const ingredientDetailsPagePath = `${ingredientsPagePath}/:_id`;
export const addOrderPagePath = '/addorder';

export const profilePagePath = '/profile';
export const orderHistoryPagePath = 'orderhistory';
export const logoutPagePath = 'logout';

export const constructorMainMenuName = 'Конструктор';
export const feedMainMenuName = 'Лента заказов';
export const profileMainMenuName = 'Личный кабинет';

export const profileSubName = 'Профиль';
export const profileOrderHistorySubMenuName = 'История заказов';
export const profileLogoutSubMenuName = 'Выход';

export const subMenuHeaderTip = 'В этом разделе вы можете';
export const subMenuTips = {
	'/profile': 'изменить свои персональные данные',
	'/profile/orderhistory': 'посмотреть свою историю заказов',
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

export const dragItemTypes = {
	ingredient: 'ingredient',
	constructor_ingredient: 'constructor_ingredient',
};

export const ingredientsDetailTitle = 'Детали ингредиента';
export const ingredientNotFoundError = 'Ингредиент не определен';
export const ingredientsDetailCaloriesTip = 'Каллории, ккал';
export const ingredientsDetailProteinsTip = 'Белки, г';
export const ingredientsDetailFatTip = 'Жиры, г';
export const ingredientsDetailCarbohydratesTip = 'Углеводы, г';

export const addOrderLoadingTitle = 'Оформление заказа...';
export const addOrderDoneTitle = '';
export const addOrderErrorTitle = 'Ошибка оформления заказа';
export const addOrderButtonText = 'Оформить заказ';

export const burgerIngredientsHeader = 'Соберите бургер';
export const burgerConstructorIngredientBlankText = 'Выберите ингредиенты';
export const burgerConstructorIngredientBlankImg = transparent_img;
export const burgerConstructorBunBlankText = 'Выберите булки';
export const burgerConstructorBunBlankImg = transparent_img;

export const forgotPasswordTitle = 'Восстановление пароля';
export const forgotPasswordSubmitButton = 'Восстановить';
export const forgotPasswordRememberText = 'Вспомнили пароль?';
export const forgotPasswordRememberLink = 'Войти';

export const loginTitle = 'Вход';
export const loginSubmitButton = 'Войти';
export const loginNewUserText = 'Вы - новый пользователь?';
export const loginNewUserLink = 'Зарегистрироваться';
export const loginForgotText = 'Забыли пароль?';
export const loginForgotLink = 'Восстановить пароль';

export const registerTitle = 'Регистрация';
export const registerSubmitButton = 'Зарегистрироваться';
export const registerAlreadyText = 'Уже зарегистрированы?';
export const registerAlreadyLink = 'Войти';

export const resetPasswordTitle = 'Восстановление пароля';
export const resetPasswordSubmitButton = 'Сохранить';
export const resetPasswordRememberText = 'Вспомнили пароль?';
export const resetPasswordRememberLink = 'Войти';
