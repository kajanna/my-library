import React from 'react';

import './Card.scss';

interface cardProps {
    children: JSX.Element[] | JSX.Element | string,
    title?: string |null,
    cardFooter?: JSX.Element[] | JSX.Element | string | null,
    addContentPadding?: boolean | null,

}

function Card({ children, title, cardFooter, addContentPadding }: cardProps) {
    return (
        <div className="card">
            <div className="card_title">{title}</div>
            <div className={ addContentPadding ? "card_content card_content--padding" : "card_content"}>{children}</div>
            <div className={cardFooter ?"card_footer" : "card_footer--no-content"}>{cardFooter && cardFooter}</div>
          
        </div>
    );
}

export default Card;