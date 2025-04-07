import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure Tailwind styles are imported
import App from './App'; // Corrected casing: Changed from './app' if that was the issue, ensures it matches App.js filename
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();