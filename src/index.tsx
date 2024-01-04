import {App} from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { TableProvider } from './context/TableContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TableProvider>
    <App />
    </TableProvider>
  </React.StrictMode>
);

reportWebVitals();
