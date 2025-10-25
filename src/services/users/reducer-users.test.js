import {
	usersSlice,
	initialState,
	setUser,
	setIsAuthChecked,
} from './reducers';
import { register, login, updateUser, logout } from './actions';
import { describe, it, expect } from 'vitest';

describe('users reducer', () => {
	it('initial state test', () => {
		expect(usersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('setUser', () => {
		const test_user = {
			name: 'testUserName',
			email: 'testUserEmail',
		};
		expect(
			usersSlice.reducer(initialState, {
				type: setUser.type,
				payload: test_user,
			})
		).toEqual({
			...initialState,
			user: test_user,
		});
	});

	it('setIsAuthChecked', () => {
		const test_isAuthChecked = !initialState.isAuthChecked;
		expect(
			usersSlice.reducer(initialState, {
				type: setIsAuthChecked.type,
				payload: test_isAuthChecked,
			})
		).toEqual({
			...initialState,
			isAuthChecked: test_isAuthChecked,
		});
	});

	it('login fulfilled', () => {
		const test_user = {
			user: {
				name: 'testUserName',
				email: 'testUserEmail',
			},
		};

		expect(
			usersSlice.reducer(initialState, {
				type: login.fulfilled.type,
				payload: test_user,
			})
		).toEqual({
			...initialState,
			user: test_user.user,
			isAuthChecked: true,
		});
	});

	it('logout fulfilled', () => {
		expect(
			usersSlice.reducer(initialState, { type: logout.fulfilled.type })
		).toEqual({
			...initialState,
			user: null,
		});
	});

	it('updateUser fulfilled', () => {
		const test_user_before = {
			user: {
				name: 'testUserNameBefore',
				email: 'testUserEmailBefore',
			},
		};

		const test_user_after = {
			user: {
				name: 'testUserNameAfter',
				email: 'testUserEmailAfter',
			},
		};

		expect(
			usersSlice.reducer(
				{ ...initialState, user: test_user_before },
				{ type: updateUser.fulfilled.type, payload: test_user_after }
			)
		).toEqual({
			...initialState,
			user: test_user_after.user,
		});
	});

	it('register fulfilled', () => {
		const test_user = {
			user: {
				name: 'testUserName',
				email: 'testUserEmail',
			},
		};

		expect(
			usersSlice.reducer(initialState, {
				type: register.fulfilled.type,
				payload: test_user,
			})
		).toEqual({
			...initialState,
			user: test_user.user,
		});
	});
});
