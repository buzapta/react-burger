export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = async () => {
	const res = await fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
		method: 'GET',
		headers: ingredientsApiConfig.headers,
	});
	return getResponse(res);
};
