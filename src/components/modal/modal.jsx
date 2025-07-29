import * as PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { modalHeaderContext } from '../../config/consts';

const modalRoot = document.getElementById('modal_id');

export const Modal = (props) => {
	const { modalContent } = props;
	const [header, setHeader] = useState('');
	const headerValue = { setHeader };
	const inputRef = useRef(null);
	const navigate = useNavigate();

	const handleClose = useCallback(() => {
		navigate(-1, { replace: true });
	}, [navigate]);

	useEffect(() => {
		const handleEscapePress = (event) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};

		const handleClick = (event) => {
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

Modal.propTypes = {
	header: PropTypes.string,
	modalContent: PropTypes.element.isRequired,
};
