import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter } from "react-router-dom";
import App from './App';
import { HashRouter } from "react-router-dom";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);


