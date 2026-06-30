import React from 'react';
import { createRoot } from 'react-dom/client';
import { SplitProvider } from './state/SplitContext';
import App from './App';
import './tokens.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SplitProvider>
      <App />
    </SplitProvider>
  </React.StrictMode>,
);
