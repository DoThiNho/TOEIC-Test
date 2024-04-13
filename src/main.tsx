import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';
import CommonHeader from 'components/common/CommonHeader.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <CommonHeader />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
