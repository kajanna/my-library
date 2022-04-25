
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import AppearAnimation from "../../shared/AppearAnimation";

import "./Auth.scss";


const Auth = () => {
  const auth = getAuth();

  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setShouldNavigate(true);
      }
    });
    return Unsubscribe;
  }, [auth, shouldNavigate]);

  return (
    <AppearAnimation>
      {shouldNavigate ? (
        <Navigate to="/my-library" />
      ) : (
        <div className="auth">
          <div className="auth-element">
            <Register />
          </div>
          <div className="auth-element">
            <Login />
          </div>
        </div>
      )}
    </AppearAnimation>
  );
};

export default Auth;
