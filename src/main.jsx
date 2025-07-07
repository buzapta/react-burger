import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from './services/store.js';

const store = createStore();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
