export const getResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
