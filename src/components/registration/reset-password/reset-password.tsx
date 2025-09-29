import styles from './reset-password.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FormEvent, ChangeEvent, useState } from 'react';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { usersApi } from '@utils/users-api';
import {
	resetPasswordTitle,
	resetPasswordSubmitButton,
	resetPasswordRememberText,
	resetPasswordRememberLink,
} from '../../../config/consts';

import { TPasswordApiRes } from '@/utils/types';

export const ResetPassword = (): React.JSX.Element => {
	const navigate = useNavigate();
	const resetPasswordFlag = localStorage.getItem('resetPassword');
	const [pass, setPass] = useState<string>('');
	const [code, setCode] = useState<string>('');

	const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCode(event.target.value);
	};

	const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPass(event.target.value);
	};

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		usersApi
			.resetPassword({ password: pass, token: code })
			.then((userResponse) => acceptPassword(userResponse))
			.catch((err) => alert(err));
	}

	function acceptPassword(userResponse: TPasswordApiRes) {
		if (userResponse.success) {
			localStorage.removeItem('resetPassword');
			navigate('/login', { replace: true });
		}
	}

	if (!resetPasswordFlag) {
		return <Navigate to='/forgot-password' state={{ replace: true }} />;
	}

	return (
		<form onSubmit={handleFormSubmit} className={`${styles.container}`}>
			<div className={`${styles.main}`}>
				<div className={'text text_type_main-medium'}>{resetPasswordTitle}</div>
				<div className={`${styles.content} pt-6 pb-20`}>
					<PasswordInput
						value={pass}
						placeholder={'Введите новый пароль'}
						name={'password'}
						onChange={handlePassChange}
					/>
					<Input
						value={code}
						placeholder={'Введите код из письма'}
						name={'code'}
						onChange={handleCodeChange}
					/>
					<Button htmlType='submit' type='primary' size='large'>
						{resetPasswordSubmitButton}
					</Button>
				</div>
				<div className={'text text_type_main-default text_color_inactive'}>
					{resetPasswordRememberText}
					<Link
						to='/login'
						className={`${styles.footer_link} text text_type_main-default ml-2`}>
						{resetPasswordRememberLink}
					</Link>
				</div>
			</div>
		</form>
	);
};
