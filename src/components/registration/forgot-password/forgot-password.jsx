import styles from './forgot-password.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { usersApi } from '../../../utils/users-api';
import {
	forgotPasswordTitle,
	forgotPasswordSubmitButton,
	forgotPasswordRememberText,
	forgotPasswordRememberLink,
} from '../../../config/consts';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	function handleFormSubmit(event) {
		event.preventDefault();
		usersApi
			.forgotPassword({ email: email })
			.then((userResponse) => resetPassword(userResponse));
	}

	function resetPassword(userResponse) {
		if (userResponse.success) {
			localStorage.setItem('resetPassword', true);
			navigate('/reset-password', { replace: true });
		}
	}

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit} className={`${styles.container}`}>
			<div className={`${styles.main}`}>
				<div className={'text text_type_main-medium'}>
					{forgotPasswordTitle}
				</div>
				<div className={`${styles.content} pt-6 pb-20`}>
					<EmailInput
						placeholder={'Укажите e-mail'}
						value={email}
						name={'email'}
						onChange={handleEmailChange}
						isIcon={false}
					/>
					<Button htmlType='submit' type='primary' size='large'>
						{forgotPasswordSubmitButton}
					</Button>
				</div>
				<div className={'text text_type_main-default text_color_inactive'}>
					{forgotPasswordRememberText}
					<Link
						to='/login'
						className={`${styles.footer_link} text text_type_main-default ml-2`}>
						{forgotPasswordRememberLink}
					</Link>
				</div>
			</div>
		</form>
	);
};
