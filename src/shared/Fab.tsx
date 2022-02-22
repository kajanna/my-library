import React from 'react';
import { Link }from 'react-router-dom'
import './Fab.scss'

interface FabProps {
    to: string,
    destination: "up" | "add" | "library"
}

function Fab({ to, destination }:FabProps) {
    return (
        <div className='fab'>
            <Link to={to}>
            Fab
            </Link>
        </div>
    );
}

export default Fab;