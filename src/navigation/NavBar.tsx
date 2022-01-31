import React from 'react';
import Menu from './Menu';
import { ReactComponent as BookMark } from '../assets/bookMarkEl.svg'

import './NavBar.scss';

function NavBar() {
  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar_elements">
          <div className="nav-bar_hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-bar_logo">MyLibrary</div>
        </div>
      </div>
      <div  className="nav-bar_book-mark">
        <BookMark />
      </div>
      )
    </>
  );
}

export default NavBar;