import { createContext } from 'react';
import transparent_img from '../images/transparent.png';
import {
	TmodalSetHeader,
	TBurgerGroup,
	TBurgerGroupType,
	burgerGroupCode,
} from '../utils/types';

export const modalHeaderContext = createContext<TmodalSetHeader>({
	setHeader: () => {},
});

export const loginPagePath = '/login';
export const registerPagePath = '/register';
export const forgotPasswordPagePath = '/forgot-password';
export const resetPasswordPagePath = '/reset-password';
export const ingredientsPagePath = '/ingredients';
export const ingredientIdParam = '/:_id';
export const ingredientDetailsPagePath = `${ingredientsPagePath}${ingredientIdParam}`;
export const addOrderPagePath = '/addorder';
export const feedPagePath = '/feed';
export const orderNumberParam = '/:number';
export const orderFeedPagePath = `${feedPagePath}${orderNumberParam}`;

export const profilePagePath = '/profile';
export const ordersPagePath = 'orders';
export const orderProfilePagePath = `${profilePagePath}/${ordersPagePath}${orderNumberParam}`;

export const logoutPagePath = 'logout';

export const constructorMainMenuName = 'Конструктор';
export const feedMainMenuName = 'Лента заказов';
export const profileMainMenuName = 'Личный кабинет';

export const profileSubName = 'Профиль';
export const profileOrderHistorySubMenuName = 'История заказов';
export const profileLogoutSubMenuName = 'Выход';

export const subMenuHeaderTip = 'В этом разделе вы можете';

export const subMenuTips: { [keypath: string]: string } = {
	'/profile': 'изменить свои персональные данные',
	'/profile/orders': 'посмотреть свою историю заказов',
};

export const burgerGroupType_default: TBurgerGroup =
	burgerGroupCode.burgerGroupType_bun;

export const burgerGroupType: TBurgerGroupType = {
	bun: {
		code: burgerGroupCode.burgerGroupType_bun,
		name: 'Булки',
	},
	main: {
		code: burgerGroupCode.burgerGroupType_main,
		name: 'Начинки',
	},
	sauce: {
		code: burgerGroupCode.burgerGroupType_sauce,
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

export const feedTitle = 'Лента заказов';
export const feedTotalsDoneHeader = 'Готовы:';
export const feedTotalsPendingHeader = 'В работе:';
export const feedTotalsDoneAllTime = 'Выполнено за все время:';
export const feedTotalsDoneToday = 'Выполнено за сегодня:';

export const orderInfoLoadingTitle = 'Запрос заказа...';
export const orderInfoErrorTitle = 'Ошибка запроса заказа';
export const order_info_ingredients_title = 'Состав:';

export enum constructorLocation {
	LocationTop = 'top',
	LocationBottom = 'bottom',
	LocationCenter = 'center',
}

export const ORDERS_FEED_SERVER_URL =
	'wss://norma.nomoreparties.space/orders/all';
export const ORDERS_PROFILE_SERVER_URL =
	'wss://norma.nomoreparties.space/orders';

export const order_item_image_gap = 48;
export const order_item_max_count = 6;

export enum order_item_status {
	done = 'done',
	pending = 'pending',
	created = 'created',
}

export const order_item_status_name: { [key: string]: string } = {
	done: 'Выполнен',
	pending: 'Готовиться',
	created: 'Создан',
};
