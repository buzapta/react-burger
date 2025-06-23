import * as PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal_id');

export const Modal = (props) => {
	const { header, onClose, modalContent } = props;
	const inputRef = useRef(null);

	useEffect(() => {
		const handleEscapePress = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const handleClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (inputRef.current === event.target) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscapePress);
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('keydown', handleEscapePress);
			document.removeEventListener('click', handleClick);
		};
	}, [onClose]);

	return createPortal(
		<ModalOverlay ref={inputRef}>
			<section className={styles.wrap}>
				<div className={`${styles.header} ml-10 mt-10 mr-10`}>
					<p className={'text text_type_main-large'}>{header}</p>
					<button
						className={`${styles.buttonclose}`}
						onClick={() => {
							onClose();
						}}
						type='button'>
						<CloseIcon type='primary' />
					</button>
				</div>
				{modalContent}
			</section>
		</ModalOverlay>,
		modalRoot
	);
};

Modal.propTypes = {
	header: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	modalContent: PropTypes.element.isRequired,
};
