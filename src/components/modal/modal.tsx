import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { To, useNavigate } from 'react-router-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { modalHeaderContext } from '../../config/consts';
import { TmodalHeader } from '../../utils/types';

const modalRoot = document.getElementById('modal_id') as HTMLElement;
type TProps = { modalContent: React.JSX.Element };
type THeaderState = [
	TmodalHeader,
	React.Dispatch<React.SetStateAction<TmodalHeader>>,
];

export const Modal = (props: TProps): React.JSX.Element => {
	const { modalContent } = props;
	const [header, setHeader]: THeaderState = useState<TmodalHeader>('');
	const headerValue = { setHeader };
	const inputRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	const handleClose = useCallback(() => {
		navigate(-1 as To, { replace: true });
	}, [navigate]);

	useEffect(() => {
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};

		const handleClick = (event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();
			if (inputRef.current === event.target) {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEscapePress);
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('keydown', handleEscapePress);
			document.removeEventListener('click', handleClick);
		};
	}, [handleClose]);

	return createPortal(
		<ModalOverlay ref={inputRef}>
			<modalHeaderContext.Provider value={headerValue}>
				<section className={styles.wrap}>
					<div className={`${styles.header} ml-10 mt-10 mr-10`}>
						<p className={'text text_type_main-large'}>{header}</p>
						<button
							className={`${styles.buttonclose}`}
							onClick={() => {
								handleClose();
							}}
							type='button'>
							<CloseIcon type='primary' />
						</button>
					</div>
					{modalContent}
				</section>
			</modalHeaderContext.Provider>
		</ModalOverlay>,
		modalRoot
	);
};
