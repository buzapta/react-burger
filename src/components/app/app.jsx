import styles from './app.module.css';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { Modal } from '../modal/modal.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { clearIngredient } from '../../services/ingredient/reducers.js';
import { modalTypes } from '../../config/consts.js';

export const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const dispatch = useDispatch();

	const closeModal = useCallback(() => {
		setShowModal(false);
		if (modalContent.modalType === modalTypes.ingredientsDetail) {
			dispatch(clearIngredient());
		}
		setModalContent('');
	}, [modalContent, dispatch]);

	const openModal = useCallback((modalContentNew) => {
		setModalContent(modalContentNew);
		setShowModal(true);
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main} pl-5 pr-5`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients openModal={openModal} />
					<BurgerConstructor openModal={openModal} />
					{showModal && (
						<Modal
							header={modalContent.header}
							onClose={closeModal}
							modalContent={modalContent.content}></Modal>
					)}
				</DndProvider>
			</main>
		</div>
	);
};
