import { BurgerConstructor } from '../components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = (): React.JSX.Element => {
	return (
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	);
};
