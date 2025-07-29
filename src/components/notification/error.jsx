import styles from './error.module.css';

export const Error = ({ children }) => {
	return (
		<div className={`${styles.container} text text text_type_main-medium`}>
			<p>{children}</p>
		</div>
	);
};
