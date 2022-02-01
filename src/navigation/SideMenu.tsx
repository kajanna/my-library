import React from 'react';

import Menu from './Menu'

import './SideMenu.scss'
interface sideMenuProps {
    onClose: () => void
}

function SideMenu({ onClose } : sideMenuProps) {
    return (
        <div className="side-menu" onClick={onClose}>
            <Menu />
        </div>
    );
}

export default SideMenu;