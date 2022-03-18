import { ReactComponent as WelcomeBG } from '../../assets/WelcomeBg.svg';
import Blobs from '../../assets/welcomeBG_blobs.png'

import WelcomeCTA from '../components/WelcomeCTA'

import './Welcome.scss';

function Welcome() {
  return (
    <div className="welcome">
        <img src={Blobs} />
        <div className='welcome__content'>
        <div className="welcome__picture">
          <WelcomeBG />
        </div>
        <div className='welcome__text'>
        <WelcomeCTA />
        </div>
        </div>
    </div>
  );
}

export default Welcome;