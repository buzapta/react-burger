import styles from './profile.module.css';
import { useResolvedPath, NavLink, Outlet, Path } from 'react-router';

import {
	profilePagePath,
	ordersPagePath,
	logoutPagePath,
	profileSubName,
	profileOrderHistorySubMenuName,
	profileLogoutSubMenuName,
	subMenuTips,
	subMenuHeaderTip,
} from '../../config/consts';

export const Profile = (): React.JSX.Element => {
	const resolvesPath = useResolvedPath({} as Partial<Path>);

	return (
		<>
			<div className={`${styles.container} mt-25`}>
				<nav className={`${styles.menu}`}>
					<NavLink
						to={profilePagePath}
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}
						end>
						<p className='text text_type_main-medium'>{profileSubName}</p>
					</NavLink>
					<NavLink
						to={ordersPagePath}
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}
						end={true}>
						<p className='text text_type_main-medium'>
							{profileOrderHistorySubMenuName}
						</p>
					</NavLink>
					<NavLink
						to={logoutPagePath}
						replace={true}
						className={({ isActive }) =>
							isActive ? styles.link_active : styles.link
						}
						end={true}>
						<p className='text text_type_main-medium'>
							{profileLogoutSubMenuName}
						</p>
					</NavLink>
				</nav>
				<div className={'text_color_inactive mt-20'}>
					<p>
						{subMenuHeaderTip}
						<br />
						{subMenuTips[resolvesPath.pathname]}
					</p>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};
