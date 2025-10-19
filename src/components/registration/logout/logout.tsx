import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../services/store';
import { logout } from '../../../services/users/actions';

export const Logout = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/', { replace: true });
		return () => {
			dispatch(logout());
		};
	}, [dispatch, navigate]);

	return <></>;
};
