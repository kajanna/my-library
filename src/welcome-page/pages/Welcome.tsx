import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WelcomeBG } from '../../assets/WelcomeBg.svg';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import AuthContext from '../../shared/contexts/authContext';

import './Welcome.scss';

function Welcome() {
  const auth = useContext(AuthContext);

  return (
    <div className="welcome">
      <div className="welcome__info">
        <Card title="Welcome to MyLibray App" addContentPadding>
          <div className="welcome__text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            eligendi maiores autem id aliquam cumque deleniti sunt, officia
            ratione incidunt nesciunt blanditiis expedita consequuntur?
          </div>
          <div className="welcome__register">
            
            {auth && <Link to="/my-library"><Button buttonText="My Library"/></Link>}
            {!auth && <Link to="/auth"><Button buttonText="Register"/></Link>}
            </div>
          <div className="welcome__picture">
            <WelcomeBG />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Welcome;