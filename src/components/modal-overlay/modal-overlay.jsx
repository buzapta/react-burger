import styles from './modal-overlay.module.css';
import { forwardRef } from 'react';

export const ModalOverlay = forwardRef((props, ref) => {
	return (
		<div ref={ref} className={styles.wrap}>
			{props.children}
		</div>
	);
});
