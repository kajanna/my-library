import Menu from './Menu';

import './SideMenu.scss'
interface sideMenuProps {
    onClose: () => void,
    show: boolean
}

function SideMenu({ onClose, show } : sideMenuProps) {
    return (
        <div className={show ? "side-menu side-menu--show" : "side-menu"} onClick={onClose}>
            <Menu />
        </div>
    );
}

export default SideMenu;