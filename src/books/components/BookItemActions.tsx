import React from 'react';

import { ReactComponent as BorrowIcon } from '../../assets/borrow_icon.svg';
import { ReactComponent as EditIcon } from '../../assets/edit_icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'

import './BookItemActions.scss';

function BookItemActions() {
  return (
    <div className="book-item-actions">
      <div>
        <BorrowIcon className="book-item-actions__icons" />
      </div>
      <div>
        <EditIcon className="book-item-actions__icons" />
      </div>
      <div>
        <DeleteIcon className="book-item-actions__icons" />
      </div>
    </div>
  );
}

export default BookItemActions;