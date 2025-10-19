import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/users/reducers';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	constructorMainMenuName,
	feedMainMenuName,
	profileMainMenuName,
	profilePagePath,
} from '../../config/consts';
import { TUser } from '@/utils/types';

export const AppHeader = (): React.JSX.Element => {
	const user: TUser | null = useSelector(getUser);
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									{constructorMainMenuName}
								</p>
							</>
						)}
					</NavLink>

					<NavLink
						to='/feed'
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									{feedMainMenuName}
								</p>
							</>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.link_position_last}>
					<NavLink
						to={profilePagePath}
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}>
						{({ isActive }) => (
							<>
								<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									{user ? user.name : profileMainMenuName}
								</p>
							</>
						)}
					</NavLink>
				</div>
			</nav>
		</header>
	);
};
