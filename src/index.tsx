import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home/Home';
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const currentUrl = window.location.pathname;

root.render(
  <React.StrictMode>
    {currentUrl === '/' ? <Home /> : <App />}
  </React.StrictMode>
);
