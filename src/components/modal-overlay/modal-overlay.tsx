import styles from './modal-overlay.module.css';
import { forwardRef, ReactNode } from 'react';

type Tprops = { children: ReactNode };

export const ModalOverlay = forwardRef<HTMLDivElement, Tprops>(
	(props, ref): React.JSX.Element => {
		return (
			<div ref={ref} className={styles.wrap}>
				{props.children}
			</div>
		);
	}
);
