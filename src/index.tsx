import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { lightMode } from './style/commonStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightMode}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
