import React, { useState } from 'react';

import Menu from './Menu';
import SideMenu from './SideMenu';
import { ReactComponent as BookMark } from '../assets/bookMarkEl.svg'

import './NavBar.scss';

function NavBar() {

const [ showSideMenu, setShowSideMenu ] = useState<Boolean>(false);
const showSideMenuHendler = () => setShowSideMenu(true);
const hideSideMenuHendler = () => setShowSideMenu(false);
  return (
    <>
      {showSideMenu && <SideMenu onClose={hideSideMenuHendler}/>}
      <div className="nav-bar">
        <div className="nav-bar_elements">
          <div className="nav-bar_hamburger" onClick={showSideMenuHendler}> 
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-bar_logo">MyLibrary</div>
        </div>
      </div>
      <div className="nav-bar_book-mark">
        <BookMark />
      </div>
    </>
  );
}

export default NavBar;