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
        cover={book.cover}
        date={book.date!}
        ownerName={book.ownerName}
        ownerId={book.ownerId!}
        onDeleteBook={onDeleteBook}
      />
    ));
  }

  return (
    <div className="book-list">
      {items?.length === 0 ? (
        <div className="book-list__info">No books in this category</div>
      ) : (
        bookList
      )}
    </div>
  );
}


export default BookItemList;