import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QuizModalProvider } from './components/QuizModalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizModalProvider>
      <App />
    </QuizModalProvider>
  </React.StrictMode>,
);
