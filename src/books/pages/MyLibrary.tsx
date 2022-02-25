import React, { useEffect, useState, useContext } from 'react';

import { Book } from '../../shared/shared_interfaces';
import { ReactComponent as VisibleIcon } from '../../assets/visible_icon.svg'
import AddBookLink from '../components/AddBookLink';
import BookItemList from '../components/BookItemList';
import Button from '../../shared/Button';
import AppearAnimation from '../../shared/AppearAnimation';
import AuthContext from '../../shared/contexts/authContext';
import useFirebase from '../../shared/hooks/useFirebase';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

import './MyLibrary.scss';


function MyLibrary() {
  const auth = useContext(AuthContext);

  const [loadedBooks, setLoadedBooks] = useState<Book[] | null | undefined>();
  const [filtredBooks, setFiltredBooks] = useState<Book[] | null | undefined>();
  const { getUserBooksById, clearError, loading, firebaseError } =   useFirebase();

  function placeDeleteHandler(deletedBookId: string) {
    if (loadedBooks) {
      setLoadedBooks((prevBooks) =>
        prevBooks!.filter((book) => book.id !== deletedBookId)
      );
    }
  }

  useEffect(() => {
    async function setUsersBook() {
      try {
        const books = await getUserBooksById(auth!.id);
        setLoadedBooks(books);
        setFiltredBooks(books);
      } catch (err) {}
    }
    setUsersBook();
    return () => {setUsersBook()}
  }, []);

  const buttonContent = (text: string) => (
    <div className="button-content">
      <div className="button-content__icon">
        <VisibleIcon />
      </div>
      <div>{text}</div>
    </div>
  );
  function showAllBooks(){
    setFiltredBooks(loadedBooks);
  }
  function showLentBooks() {
    if (loadedBooks) {
      const filtredBooks = loadedBooks.filter(book => book.ownerId == auth?.id);
      setFiltredBooks(filtredBooks);
    }
  }
  function showBorrowedBooks() {
    if (loadedBooks) {
      const filtredBooks = loadedBooks.filter(book => book.borrowerId == auth?.id);
      setFiltredBooks(filtredBooks);
    }
  }
  
  return (
    <>
      {loading && <LoadingSpinner />}
      {firebaseError && (
        <ErrorModal errorText={firebaseError} closeErrorModal={clearError} />
      )}
      <AppearAnimation>
        <div className="my-library__main">
          <AddBookLink />
          <div>
            <div className="my-library__buttons">
              <Button
                buttonText={buttonContent("all books")}
                onClick={showAllBooks}
              />
              <Button
                buttonText={buttonContent("lent books")}
                onClick={showLentBooks}
              />
              <Button
                buttonText={buttonContent("borrowed books")}
                onClick={showBorrowedBooks}
              />
            </div>
          </div>
        </div>
       <BookItemList items={filtredBooks} onDeleteBook={placeDeleteHandler}/>
      </AppearAnimation>
    </>
  );
}

export default MyLibrary;