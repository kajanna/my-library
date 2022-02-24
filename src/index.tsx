import React from 'react';
import ReactDOM from 'react-dom';
import './firebase';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './shared/contexts/authContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

