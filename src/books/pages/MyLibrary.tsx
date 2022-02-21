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
 
  const [ loadedBooks, setLoadedBooks ] = useState<Book[] | null | undefined>();
   const { getUserBooksById, books, loading, firebaseError } = useFirebase();
  

   function placeDeleteHandler(deletedBookId: string) {
     if (loadedBooks) {
      setLoadedBooks(prevBooks => prevBooks!.filter(book => book.id !== deletedBookId));
     }
  }

  useEffect(()=> {
    getUserBooksById(auth!.id);
  }, [auth, getUserBooksById]);

  useEffect(()=> {
    setLoadedBooks(books);
  }, [ books ]);
        
    const buttonContent = (text :string) => (
      <div className='button-content'>
        <div className='button-content__icon'><VisibleIcon /></div>
        <div>{text}</div>
      </div>
    );
    return (
      <AppearAnimation>
          <div className="my-library__main">
            {loading && LoadingSpinner}
            {firebaseError && ErrorModal}
            <AddBookLink />
            <div>
              <div className="my-library__buttons">
            <Button
              buttonText={buttonContent("all books")}
              onClick={() => console.log("show all books")}
            />
            <Button
              buttonText={buttonContent("lent books")}
              onClick={() => console.log("show Lent books")}
            />
            <Button
              buttonText={buttonContent("borrowed books")}
              onClick={() => console.log("show Borrowed books")}
            />
            </div>
            </div>
          </div>
          
            <BookItemList items={loadedBooks} onDeleteBook={placeDeleteHandler}/>
      </AppearAnimation>
    );
}

export default MyLibrary;