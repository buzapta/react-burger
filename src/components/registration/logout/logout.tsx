import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @ts-expect-error "sprint5"
import { logout } from '../../../services/users/actions';

export const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/', { replace: true });
		return () => {
			dispatch(logout());
		};
	}, [dispatch, navigate]);
};
