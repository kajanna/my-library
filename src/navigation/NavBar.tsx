import { useState } from "react";

import SideMenu from "./SideMenu";
import { ReactComponent as BookMark } from "../assets/bookMarkEl.svg";
import BackDrop from "../shared/BackDrop";

import "./NavBar.scss";

const NavBar = () => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const showSideMenuHendler = () => setShowSideMenu(true);
  const hideSideMenuHendler = () => setShowSideMenu(false);
  return (
    <>
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
      <SideMenu show={showSideMenu} onClose={hideSideMenuHendler} />
      {showSideMenu && <BackDrop close={hideSideMenuHendler} />}
    </>
  );
}

export default NavBar;
