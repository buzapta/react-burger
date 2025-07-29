import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@components/app/app';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from './services/store';

const store = createStore();

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
