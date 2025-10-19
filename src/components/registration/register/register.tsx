import styles from './register.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from '../../../services/store';
import { Link } from 'react-router-dom';
import { register } from '../../../services/users/actions';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	registerTitle,
	registerSubmitButton,
	registerAlreadyText,
	registerAlreadyLink,
} from '../../../config/consts';

export const Register = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPass(event.target.value);
	};

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		dispatch(register({ email: email, password: pass, name: name }));
	}

	return (
		<form onSubmit={handleFormSubmit} className={`${styles.container}`}>
			<div className={`${styles.main}`}>
				<div className={'text text_type_main-medium'}>{registerTitle}</div>
				<div className={`${styles.content} pt-6 pb-20`}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						value={name}
						name={'name'}
						onChange={handleNameChange}
						size={'default'}
					/>
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
						{registerSubmitButton}
					</Button>
				</div>
				<div className={'text text_type_main-default text_color_inactive'}>
					{registerAlreadyText}
					<Link
						to='/login'
						className={`${styles.footer_link} text text_type_main-default ml-2`}>
						{registerAlreadyLink}
					</Link>
				</div>
			</div>
		</form>
	);
};
