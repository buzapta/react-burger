import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './actions';

const initialState = {
	user: null,
	isAuthChecked: false,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { getUser, getIsAuthChecked } = usersSlice.selectors;
export const { setUser, setIsAuthChecked } = usersSlice.actions;
