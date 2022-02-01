import React from 'react';

import './Card.scss';

interface cardProps {
    children: JSX.Element[] | JSX.Element | string,
    title: string,
    cardFooter?: null | JSX.Element[] | JSX.Element | string 
}

function Card({ children, title, cardFooter }: cardProps) {
    return (
        <div className="card">
            <div className="card_title">{title}</div>
            <div className="card_content">{children}</div>
            <div className="card_footer">{cardFooter && cardFooter}</div>
          
        </div>
    );
}

export default Card;