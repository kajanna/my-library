import Login from "../components/Login";
import Register from "../components/Register";
import AppearAnimation from "../../shared/AppearAnimation";

import "./Auth.scss";

const Auth = () => {
  return (
    <AppearAnimation>
      <div className="auth">
        <div className="auth-element">
          <Register />
        </div>
        <div className="auth-element">
          <Login />
        </div>
      </div>
    </AppearAnimation>
  );
};

export default Auth;
