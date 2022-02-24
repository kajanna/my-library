import React from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as BorrowIcon } from '../../assets/borrow_icon.svg';
import { ReactComponent as EditIcon } from '../../assets/edit_icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'

import './BookItemActions.scss';
interface BookItemActionsProps {
  onOpenDeleteModal: () => void,
  bookId: string | null | undefined
}

function BookItemActions({ onOpenDeleteModal, bookId }: BookItemActionsProps ) {
  return (
    <div className="book-item-actions">
      <div className="book-item-actions__icons">
        <Link to={`/lend-book/${bookId}`}>
        <BorrowIcon  />
        </Link>
      </div>
      <div className="book-item-actions__icons" >
        <Link to={`/edit-book-data/${bookId}`}>
        <EditIcon />
        </Link>
      </div>
      <div className="book-item-actions__icons" onClick={onOpenDeleteModal}>
        <DeleteIcon  />
      </div>
    </div>
  );
}

export default BookItemActions;