import styles from './login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../../services/users/actions';
import {
	loginTitle,
	loginSubmitButton,
	loginNewUserText,
	loginNewUserLink,
	loginForgotText,
	loginForgotLink,
} from '../../../config/consts';

export const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePassChange = (event) => {
		setPass(event.target.value);
	};

	function handleFormSubmit(event) {
		event.preventDefault();
		dispatch(login({ email: email, password: pass }));
	}

	return (
		<form onSubmit={handleFormSubmit} className={`${styles.container}`}>
			<div className={`${styles.main}`}>
				<div className={'text text_type_main-medium'}>{loginTitle}</div>
				<div className={`${styles.content} pt-6 pb-20`}>
					<EmailInput
						placeholder={'E-mail'}
						value={email}
						name={'email'}
						onChange={handleEmailChange}
						isIcon={false}
					/>
					<PasswordInput
						placeholder={'Пароль'}
						value={pass}
						name={'password'}
						onChange={handlePassChange}
					/>
					<Button htmlType='submit' type='primary' size='large'>
						{loginSubmitButton}
					</Button>
				</div>
				<div className={'text text_type_main-default text_color_inactive'}>
					{loginNewUserText}
					<Link
						to='/register'
						className={`${styles.footer_link} text text_type_main-default ml-2`}>
						{loginNewUserLink}
					</Link>
				</div>
				<div className={'text text_type_main-default text_color_inactive pt-4'}>
					{loginForgotText}
					<Link
						to='/forgot-password'
						className={`${styles.footer_link} text text_type_main-default ml-2`}>
						{loginForgotLink}
					</Link>
				</div>
			</div>
		</form>
	);
};
