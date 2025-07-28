// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import QuizModalProvider (use the correct relative path)
import { QuizModalProvider } from './quiz/QuizModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizModalProvider>
      <App />
    </QuizModalProvider>
  </React.StrictMode>
);

// (Optional): Web Vitals reporting removed for cleaner build.
