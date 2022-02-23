import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '../shared/hooks/useAuth';
import AuthContext from '../shared/contexts/authContext';

import './Menu.scss'

function Menu() {
    const { logout } = useAuth();
    const auth = useContext(AuthContext);

    return (
        <div className="menu">
            <NavLink to="/">Home</NavLink>
            {!auth &&<NavLink to="/auth">Login</NavLink>}
            { auth && <NavLink to="/my-library">My library</NavLink>}
            { auth && <NavLink to="/add-new-book">Add new book</NavLink>}
            { auth && <NavLink to="/borrow-book">Borrow book</NavLink>}
            { auth && <div onClick={logout}>Logout</div>}
        </div>
    );
}

export default Menu;