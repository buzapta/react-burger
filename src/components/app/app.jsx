import styles from './app.module.css';
import { useCallback, useEffect, useState } from 'react';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { Modal } from '../modal/modal.jsx';
import { Preloader } from '@components/preloader/preloader.jsx';
import { ingredientsUrl } from '../../config/consts.js';

export const App = () => {
	const [loading, setLoading] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState('');

	useEffect(() => {
		const getIngredients = async () => {
			setLoading(true);
			const response = await fetch(ingredientsUrl);
			if (!response.ok) {
				const message = `Ошибка получения данных: ${response.status}`;
				throw new Error(message);
			}
			const ingredients_data = await response.json();
			setIngredients(ingredients_data.data);
		};
		getIngredients().catch((error) => {
			console.log(error.message);
		});
		setLoading(false);
	}, []);

	const closeModal = useCallback(() => {
		setShowModal(false);
		setModalContent('');
	}, []);

	const openModal = useCallback((ModalContent) => {
		setModalContent(ModalContent);
		setShowModal(true);
	}, []);

	if (loading) {
		return <Preloader />;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} openModal={openModal} />
				<BurgerConstructor ingredients={ingredients} openModal={openModal} />
				{showModal && (
					<Modal
						header={modalContent.header}
						onClose={closeModal}
						modalContent={modalContent.content}></Modal>
				)}
			</main>
		</div>
	);
};
