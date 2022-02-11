import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import BookItem from './BookItem'

import './BookItemList.scss'

interface BookItemListProps {
    items: Book[]
}

function BookItemList({ items}: BookItemListProps) {
    return (<div className='book-list'>
    
        {items.map((book:Book)=> <BookItem 
        key={book.id}
        id={book.id}
        borrower={book.borrower} 
        title={book.title} 
        author={book.author} 
        date={book.date}
        owner={book.owner} />
        )}
     
    </div>)
}


export default BookItemList;