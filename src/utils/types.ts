export type TmodalHeader = string;
export type TmodalSetHeader = {
	setHeader: React.Dispatch<React.SetStateAction<TmodalHeader>>;
};

export type TForgotPasswordApiReq = {
	email: string;
};

export type TPasswordApiRes = {
	success: boolean;
	message: string;
};

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

export type TUser = Omit<TUserRegisterApiReq, 'password'>;

export type TUserUpdateApiReq = TUserRegisterApiReq;

export type TUserUpdateApiRes = {
	success: boolean;
	user: TUser;
};

export type TTokens = {
	accessToken: string;
	refreshToken: string;
};

export type TUserApiRes = TTokens & {
	success: boolean;
	user: TUser;
};

export type TTokenRefreshApiReq = TTokens & {
	success: boolean;
};

export type TRegisterApiRes = TUserApiRes & TUserUpdateApiRes;

export type TOrdersApiReq = {
	ingredients: string[];
};

export type TOrdersApiRes = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export type TIngredientsApiRes = {
	success: boolean;
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

export type TIngredientWithKey = TIngredient & {
	key?: string;
};
