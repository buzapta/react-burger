import { ReactNode } from 'react';
import styles from './error.module.css';

type TProps = { children?: ReactNode };

export const Error = (props: TProps): React.JSX.Element => {
	return (
		<div className={`${styles.container} text text text_type_main-medium`}>
			<p>{props.children}</p>
		</div>
	);
};
