import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import BookItem from './BookItem'

import './BookItemList.scss'

interface BookItemListProps {
    items: Book[] | null | undefined,
    onDeleteBook: (deletedBookId: string) => void
}

function BookItemList({ items, onDeleteBook }: BookItemListProps) {
    let bookList;
    if (items) {
      bookList = items.map((book: Book) => (
        <BookItem
          key={book.id}
          id={book.id!}
          borrowerName={book.borrowerName}
          borrowerId={book.borrowerId}
          title={book.title}
          authors={book.authors}
          date={book.date!}
          ownerName={book.ownerName}
          ownerId={book.ownerId!}
          onDeleteBook={onDeleteBook}
        />
      ));
    } else {
      <div>No books!</div>;
    }
    return (<div className='book-list'>
         {bookList}
    </div>)
}


export default BookItemList;