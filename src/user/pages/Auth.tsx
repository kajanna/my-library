import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import AppearAnimation from '../../shared/AppearAnimation';

import './Auth.scss'

function Auth() {
    return (
      <AppearAnimation>
        <div className="auth-element">
          <Login />
        </div>
        <div className="auth-element">
          <Register />
        </div>
      </AppearAnimation>
    );
}

export default Auth;