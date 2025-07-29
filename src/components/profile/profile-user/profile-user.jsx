import styles from './profile-user.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../../services/users/reducers';
import { updateUser } from '../../../services/users/actions';

export const ProfileUser = () => {
	const dispatch = useDispatch();
	const [edited, setEdited] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const user = useSelector(getUser);

	const setDefaultValue = useCallback(() => {
		setName(user?.name);
		setEmail(user?.email);
		setEdited(false);
	}, [setName, setEmail, setEdited, user]);

	useEffect(() => {
		setDefaultValue();
	}, [setDefaultValue]);

	const handleNameChange = (event) => {
		setName(event.target.value);
		setEdited(true);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setEdited(true);
	};

	const handlePassChange = (event) => {
		setPass(event.target.value);
		setEdited(true);
	};

	const handleCancelButtonClick = () => {
		setDefaultValue();
	};

	function handleFormSubmit(event) {
		event.preventDefault();
		dispatch(updateUser({ email: email, password: pass, name: name }));
		setEdited(false);
	}

	return (
		<>
			<form
				onSubmit={handleFormSubmit}
				className={`${styles.container}`}
				id='profile_form'>
				<div className={`${styles.main}`}>
					<div className={`${styles.content} `}>
						<Input
							placeholder={'Имя'}
							value={name}
							name={'name'}
							onChange={handleNameChange}
							icon='EditIcon'
						/>
						<EmailInput
							placeholder={'Логин'}
							value={email}
							name={'email'}
							onChange={handleEmailChange}
							isIcon={true}
						/>
						<PasswordInput
							value={pass}
							name={'pass'}
							onChange={handlePassChange}
							icon='EditIcon'
						/>
						{edited && (
							<div className={`${styles.buttons}`}>
								<Button
									htmlType='button'
									type='secondary'
									size='small'
									onClick={handleCancelButtonClick}>
									Отмена
								</Button>
								<Button htmlType='submit' type='primary' size='small'>
									Сохранить
								</Button>
							</div>
						)}
					</div>
				</div>
			</form>
		</>
	);
};
