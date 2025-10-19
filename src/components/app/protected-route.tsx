import { useSelector } from 'react-redux';
import { getIsAuthChecked, getUser } from '../../services/users/reducers';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@components/preloader/preloader';
import { loginPagePath } from '../../config/consts';
import React from 'react';

type TProtectedParms = {
	onlyUnAuth?: boolean;
	component: React.JSX.Element;
	ignoreFrom?: boolean;
};

const Protected = ({
	onlyUnAuth = false,
	component,
	ignoreFrom = false,
}: TProtectedParms) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();
	if (!isAuthChecked) {
		return <Preloader />;
	}
	if (!onlyUnAuth && !user) {
		if (ignoreFrom) {
			return <Navigate to={loginPagePath} />;
		} else {
			return <Navigate to={loginPagePath} state={{ from: location }} />;
		}
	}
	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
	<Protected onlyUnAuth={true} component={component} />
);
