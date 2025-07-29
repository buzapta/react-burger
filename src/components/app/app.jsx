import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '@components/app-header/app-header';
import { Modal } from '../modal/modal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NotFound404Page } from '../../pages/notFound404';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { checkUserAuth } from '../../services/users/actions';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { OrderHistoryPage } from '../../pages/order-history-page';
import { ProfileUserPage } from '../../pages/profile-user-page';
import { ProfilePage } from '../../pages/profile';
import { LogoutPage } from '../../pages/logout';

import {
	loginPagePath,
	registerPagePath,
	forgotPasswordPagePath,
	resetPasswordPagePath,
	ingredientDetailsPagePath,
	addOrderPagePath,
	profilePagePath,
	orderHistoryPagePath,
	logoutPagePath,
} from '../../config/consts';
import { Preloader } from '@components/preloader/preloader';
import { getIngredientsState } from '../../services/ingredients/selectors';
import { loadIngredients } from '../../services/ingredients/actions';
import { Error } from '../notification/error';

export const App = () => {
	const { loading, error } = useSelector(getIngredientsState);
	let location = useLocation();
	let state = location.state;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadIngredients());
		dispatch(checkUserAuth());
	}, [dispatch]);

	if (loading) {
		return (
			<div className={styles.app}>
				<Preloader />;
			</div>
		);
	}

	if (!loading && error) {
		return <Error>{`${error}`}</Error>;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main} pl-5 pr-5`}>
				<Routes location={state?.backgroundLocation || location}>
					<Route path='/' element={<HomePage />} />
					<Route
						path={ingredientDetailsPagePath}
						element={<IngredientDetails />}
					/>
					<Route
						path={loginPagePath}
						element={<OnlyUnAuth component={<LoginPage />} />}
					/>
					<Route
						path={profilePagePath}
						element={<OnlyAuth component={<ProfilePage />} />}>
						<Route index element={<ProfileUserPage />} />
						<Route path={orderHistoryPagePath} element={<OrderHistoryPage />} />
						<Route path={logoutPagePath} element={<LogoutPage />} />
					</Route>
					<Route
						path={registerPagePath}
						element={<OnlyUnAuth component={<RegisterPage />} />}
					/>
					<Route
						path={forgotPasswordPagePath}
						element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
					/>
					<Route
						path={resetPasswordPagePath}
						element={<OnlyUnAuth component={<ResetPasswordPage />} />}
					/>
					<Route path='*' element={<NotFound404Page />} />
				</Routes>
				{state?.backgroundLocation && (
					<Routes>
						<Route
							path={ingredientDetailsPagePath}
							element={<Modal modalContent={<IngredientDetails />} />}
						/>
						<Route
							path={addOrderPagePath}
							element={
								<OnlyAuth
									ignoreFrom={true}
									component={<Modal modalContent={<OrderDetails />} />}
								/>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
	);
};
