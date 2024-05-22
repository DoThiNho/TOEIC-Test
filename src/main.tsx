import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-chat-widget/lib/styles.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
);
