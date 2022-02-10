import React, { useState } from 'react';

import { Book } from '../../shared/shared_interfaces';

import BookItemActions from './BookItemActions';
import Card from '../../shared/Card';


import './BookItem.scss'
import DeleteModal from '../../shared/DeleteModal';

function BookItem({ borrower, title, author, date, cover, id }: Book) {
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  
  const bookItemActions = <BookItemActions onOpenDeleteModal={()=>setShowDeleteModal(true)}/>
  return (
    <>
    <div className="book-item">
      <Card title={bookItemActions} noTitlePadding>
        <div className="book-item__main">
          <div className="book-item__info">
              <div className="book-item__title">{title}</div>
              <div>{author}</div> 
            <div className="book-item__info-items">{date}</div>
            <div className="book-item__info-items">
              <div>borrower:</div>
              <div>{borrower}</div>
            </div>
          </div>
          <div className="book-item__photo">{cover}</div>
        </div>
      </Card>
    </div>
    {showDeleteModal && <DeleteModal itemId={id} title={title} onCloseDeleteModal={() =>setShowDeleteModal(false)}/>}
    </>
  );
}

export default BookItem;