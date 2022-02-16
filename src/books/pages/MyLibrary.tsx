import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";

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
 
  const [ books, setBooks ] = useState<Book[]>();
   const { db } = useFirebase();
  
   async function getUserBooksById(id: string) {
     const q = query(collection(db, "books"), where("ownerId", "==", id));
     const loadedBooks: Book[] | null = [];
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
      loadedBooks.push({
        key: doc.id,
        id: doc.id,
        title: doc.data().title,
        authors: doc.data().authors,
        date: doc.data().date,
        cover: doc.data().cover,
        ownerId: doc.data().ownerId,
        ownerName: doc.data().ownerName,
        borrower: doc.data().borrower
      });
     });
     setBooks(loadedBooks)
   }
   function placeDeleteHandler(deletedBookId: string) {
     if (books) {
      setBooks(prevBooks => prevBooks!.filter(book => book.id !== deletedBookId));
     }
  }

  useEffect(()=> {
    getUserBooksById(auth!.id);
  
  }, []);
        
    const buttonContent = (text :string) => (
      <div className='button-content'>
        <div className='button-content__icon'><VisibleIcon /></div>
        <div>{text}</div>
      </div>
    );
    return (
      <AppearAnimation>
          <div className="my-library__main">
            {/* {loading && LoadingSpinner}
            {firebaseError && ErrorModal} */}
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
          
            <BookItemList items={books} onDeleteBook={placeDeleteHandler}/>
      </AppearAnimation>
    );
}

export default MyLibrary;