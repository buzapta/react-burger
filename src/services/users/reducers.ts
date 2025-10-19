import { createSlice } from '@reduxjs/toolkit';

import { login, logout, register, updateUser } from './actions';
import { TUser } from '@utils/types';

type TUserStore = {
	user: TUser | null;
	isAuthChecked: boolean;
};

const initialState: TUserStore = {
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
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user;
			});
	},
});

export const { getUser, getIsAuthChecked } = usersSlice.selectors;
export const { setUser, setIsAuthChecked } = usersSlice.actions;
