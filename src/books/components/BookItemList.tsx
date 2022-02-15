import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import BookItem from './BookItem'

import './BookItemList.scss'

interface BookItemListProps {
    items: Book[]
}

function BookItemList({ items }: BookItemListProps) {
    return (<div className='book-list'>
    
        {items.map((book:Book)=> <BookItem 
        key={book.id}
        id={book.id}
        borrower={book.borrower} 
        title={book.title} 
        authors={book.authors} 
        date={book.date}
        ownerName={book.ownerName}
        ownerId={book.ownerId} />
        )}
     
    </div>)
}


export default BookItemList;