import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QuizModalProvider } from './components/QuizModalContext';

const assistantApiUrl =
  import.meta.env.VITE_ASSISTANT_API_URL ||
  import.meta.env.VITE_OPENAUXILIUM_URL ||
  null;

if (typeof window !== 'undefined') {
  window.__APP_CONFIG__ = {
    ASSISTANT_API_URL: assistantApiUrl,
    OPENAUXILIUM_URL: import.meta.env.VITE_OPENAUXILIUM_URL || null,
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizModalProvider>
      <App />
    </QuizModalProvider>
  </React.StrictMode>,
);
