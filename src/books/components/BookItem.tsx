import React from 'react';

import { Book } from '../../shared/shared_interfaces';

import { ReactComponent as MailIcon } from '../../assets/mail_icon.svg'
import Card from '../../shared/Card';
import BookItemActions from './BookItemActions';

import './BookItem.scss'

function BookItem({ borrower, title, author, description, cover} : Book) {
    const bookItemFooter = (
        <div className='book-item__footer'>
            <div className='book-item__footer--borrower book-item__footer--separator'>
                <p>borrower</p>
            </div>
            <div className='book-item__footer--borrower'>
              <div className='book-item__footer--icon'> <MailIcon /></div>
           
                <p>
                {borrower} 
                </p>
            </div>
        </div>
    )
    return (
      <>
        <Card cardFooter={bookItemFooter}>
        <div className='book-item__actions'><BookItemActions /></div>
          <div className="book-item__main">   
            <div className="book-item__info">
              <p className="book-item__title">{title}</p>
              <p>{author}</p>
              <p>{description}</p>
            </div>
            <div className="book-item__photo">{cover}</div>
          </div>
        </Card>
      </>
    );
}

export default BookItem;