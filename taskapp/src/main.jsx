import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
