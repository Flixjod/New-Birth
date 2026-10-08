import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/variables.css';
import './styles/globals.css';
import './styles/typography.css';
import './styles/responsive.css';
import './styles/safe-area.css';
import './styles/reduced-motion.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
