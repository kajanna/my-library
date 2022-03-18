import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/Button';
import AuthContext from '../../shared/contexts/authContext';

import './WelcomeCTA.scss'

function WelcomeCTA() {
  const auth = useContext(AuthContext);
  return (
    <div className="welcomeCTA">
      <p> We will help you keep track of borrowed and lent books.</p>
      {auth && (
        <Link to="/my-library">
          <Button buttonText="My Library" />
        </Link>
      )}
      {!auth && (
        <Link to="/auth">
          <Button buttonText="Register" />
        </Link>
      )}
    </div>
  );
}

export default WelcomeCTA;