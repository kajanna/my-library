import { useEffect, useState, useContext } from 'react';

import { Book } from '../../shared/shared_interfaces';
import AddBookLink from '../components/AddBookLink';
import BookItemList from '../components/BookItemList';
import MyLibraryButton from "../../shared/MyLibraryButton";
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
  const [ activeButtonId, setActiveButtonId ] = useState<string>("all");
  const { getUserBooksById, clearError, loading, firebaseError } =   useFirebase();

  function deleteBookHandler(deletedBookId: string) {
      setLoadedBooks((prevBooks) =>
        prevBooks!.filter((book) => book.id !== deletedBookId)
      );
      setFiltredBooks((prevBooks) =>
      prevBooks!.filter((book) => book.id !== deletedBookId)
    );
    }
    function showAllBooks(buttonId:string){
      setActiveButtonId(buttonId);
      setFiltredBooks(loadedBooks);
    }
    function showLentBooks(buttonId:string) {
      setActiveButtonId(buttonId);
      if (loadedBooks) {
        const filtredBooks = loadedBooks.filter(book => book.ownerId == auth?.id);
        setFiltredBooks(filtredBooks);
      }
    }
    function showBorrowedBooks(buttonId:string) {
      setActiveButtonId(buttonId);
      if (loadedBooks) {
        const filtredBooks = loadedBooks.filter(book => book.borrowerId == auth?.id);
        setFiltredBooks(filtredBooks);
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
  }, []);

  const myLibraryButton = [ { showbooksCathegory: showAllBooks, buttonText:"show all books", id:"all"},
  { showbooksCathegory: showLentBooks, buttonText:"show lent books", id:"lent"},
  { showbooksCathegory: showBorrowedBooks, buttonText:"show borrowed books", id:"borrowed"}, ]
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
            <div>
              {myLibraryButton.map(button =>  <MyLibraryButton 
                key={button.id}
                showbooksCathegory={button.showbooksCathegory}
                buttonText={button.buttonText}
                buttonId={button.id}
                isActive={button.id === activeButtonId}
                />)}
            </div>
          </div>
        </div>
       <BookItemList items={filtredBooks} onDeleteBook={deleteBookHandler}/>
      </AppearAnimation>
    </>
  );
}

export default MyLibrary;