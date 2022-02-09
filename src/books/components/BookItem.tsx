import React from 'react';

import { Book } from '../../shared/shared_interfaces';

import BookItemActions from './BookItemActions';
import Card from '../../shared/Card';


import './BookItem.scss'

function BookItem({ borrower, title, author, date, cover }: Book) {
  const bookItemActions = <BookItemActions />
  return (
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
  );
}

export default BookItem;