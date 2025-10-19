import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Feed } from '@components/feed/feed';

export const FeedPage = (): React.JSX.Element => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Feed />
		</DndProvider>
	);
};
