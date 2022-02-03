import React from 'react';

import { ReactComponent as VisibleIcon } from "../../assets/visible_icon.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete_icon.svg"

import "./BookItemActions.scss"

function BookItemActions() {
    return (
        <div className='book-item-actions'>
            <div className='book-item-actions__button'><VisibleIcon /></div>
            <div className='book-item-actions__button'><DeleteIcon /></div>
        </div>
    );
}

export default BookItemActions;