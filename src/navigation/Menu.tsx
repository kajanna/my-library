import React from 'react';
import { NavLink } from 'react-router-dom'

import './Menu.scss'

function Menu() {
    return (
        <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth">Login</NavLink>
            <NavLink to="/search-for-books">Search for the book</NavLink>
            <NavLink to="/my-library">My library</NavLink>
            <NavLink to="/borrowed-books">Borrowed books</NavLink>
            <NavLink to="/add-new-book">Add new book</NavLink>
         
        </div>
    );
}

export default Menu;