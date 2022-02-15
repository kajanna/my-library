import React from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '../shared/hooks/useAuth';

import './Menu.scss'

function Menu() {
    const { logout } = useAuth();
    return (
        <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth">Login</NavLink>
            <NavLink to="/my-library">My library</NavLink>
            <NavLink to="/add-new-book">Add new book</NavLink>
            <NavLink to="/borrow-book">Borrow book</NavLink>
         <div onClick={logout}>Logout</div>
        </div>
    );
}

export default Menu;