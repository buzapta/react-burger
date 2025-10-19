export type TmodalHeader = React.JSX.Element;
export type TmodalSetHeader = {
	setHeader: React.Dispatch<React.SetStateAction<TmodalHeader>>;
};

export type TSuccessApiRes = {
	success: boolean;
};

export type TForgotPasswordApiReq = {
	email: string;
};

export type TBaseApiRes = TSuccessApiRes & {
	message: string;
};

export type TPasswordApiRes = TBaseApiRes;

export type TResetPasswordApiReq = {
	password: string;
	token: string;
};

export type TUserRegisterApiReq = {
	email: string;
	password: string;
	name: string;
};

export type TLoginApiReq = Omit<TUserRegisterApiReq, 'name'>;

export type TLogoutApiReq = {
	token: string;
};

export type TLogoutApiRes = TBaseApiRes;

export type TTokens = {
	accessToken: string;
	refreshToken: string;
};

export type TUser = Omit<TUserRegisterApiReq, 'password'>;

export type TUserUpdateApiReq = TUserRegisterApiReq;

export type TUserUpdateApiRes = TSuccessApiRes & {
	user: TUser;
};

export type TUserApiRes = TTokens &
	TSuccessApiRes & {
		user: TUser;
	};

export type TTokenRefreshApiReq = TTokens & { success: boolean };

export type TRegisterApiRes = TUserApiRes & TUserUpdateApiRes;

export type TOrder = {
	name: string;
	order: {
		number: number;
	};
};

export type TOrdersApiReq = string[];

export type TOrdersApiRes = TOrder & { success: boolean };

export type TIngredient = {
	_id: string;
	name: string;
	type: TBurgerGroup;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TGroupedIngredient = {
	ingredient: TIngredient;
	count: number;
};

export type TIngredientWithKey = TIngredient & {
	key?: string;
};

export type TMappedIngredients = {
	[key: string]: TIngredient;
};

export type TIngredientsApiRes = TSuccessApiRes & {
	data: TIngredient[];
};

export enum burgerGroupCode {
	burgerGroupType_bun = 'bun',
	burgerGroupType_main = 'main',
	burgerGroupType_sauce = 'sauce',
}

export type TBurgerGroup =
	| burgerGroupCode.burgerGroupType_bun
	| burgerGroupCode.burgerGroupType_main
	| burgerGroupCode.burgerGroupType_sauce;

export type TBurgerGroupTypeItem = {
	code: TBurgerGroup;
	name: string;
};

export type TBurgerGroupType = {
	bun: TBurgerGroupTypeItem;
	main: TBurgerGroupTypeItem;
	sauce: TBurgerGroupTypeItem;
};

export type TOrderItem = {
	ingredients: TIngredient['_id'][];
	_id: string;
	status: string;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type TOrdersInfo = {
	orders: TOrderItem[];
	total: number;
	totalToday: number;
};

export type TOrderInfoApiRes = TSuccessApiRes & TOrdersInfo;

export type TOrdersFeedInfo = TOrdersInfo;
export type TOrdersProfileInfo = TOrdersFeedInfo;

export type TOrdersFeedInfoApiRes = TSuccessApiRes & TOrdersFeedInfo;
export type TOrdersProfileInfoApiRes = TSuccessApiRes & TOrdersProfileInfo;

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}
