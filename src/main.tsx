import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from '@/components/app/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';

createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>
);
