import React, { useState } from 'react';

import { Book } from '../../shared/shared_interfaces';

import BookItemActions from './BookItemActions';
import Card from '../../shared/Card';


import './BookItem.scss'
import DeleteModal from '../../shared/DeleteModal';

interface BookItemProps {
  borrower?: string | null, 
  title: string, 
  authors:  string, 
  date:string, 
  id:string,
  ownerName:string,
  ownerId:string 
  onDeleteBook:(deletedBookId: string) => void
}

function BookItem({ borrower, title, authors, date, id, onDeleteBook }: BookItemProps) {
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  
  const bookItemActions = <BookItemActions bookId={id} onOpenDeleteModal={()=>setShowDeleteModal(true)}/>
  return (
    <>
    <div className="book-item">
      <Card title={bookItemActions} noTitlePadding>
        <div className="book-item__main">
          <div className="book-item__info">
              <div className="book-item__title">{title}</div>
              <div>{authors}</div> 
            <div className="book-item__info-items">{date}</div>
            <div className="book-item__info-items">
              <div>borrower:</div>
              <div>{borrower}</div>
            </div>
          </div>
          <div className="book-item__photo"></div>
        </div>
      </Card>
    </div>
    {showDeleteModal && <DeleteModal 
      itemId={id} 
      onDeleteBook={onDeleteBook} 
      title={title} 
      onCloseDeleteModal={() =>setShowDeleteModal(false)}/>}
    </>
  );
}

export default BookItem;