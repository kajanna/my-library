import { useEffect, useState, useContext } from "react";

import { Book } from "../../shared/shared_interfaces";
import AddBookLink from "../components/AddBookLink";
import BookItemList from "../components/BookItemList";
import MyLibraryButton from "../../shared/MyLibraryButton";
import AppearAnimation from "../../shared/AppearAnimation";
import AuthContext from "../../shared/contexts/authContext";
import useFirebase from "../../shared/hooks/useFirebase";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorModal from "../../shared/ErrorModal";

import "./MyLibrary.scss";

const MyLibrary = () => {
  const auth = useContext(AuthContext);

  const [loadedBooks, setLoadedBooks] = useState<Book[] | null | undefined>();
  const [filtredBooks, setFiltredBooks] = useState<Book[] | null | undefined>();
  const [activeButtonId, setActiveButtonId] = useState<string>("all");
  const [bookWasDeleted, setBookWasDeleted] = useState(false);
  const { getUserBooksById, deleteBook, clearError, loading, firebaseError } =
    useFirebase();

  const deleteBookHandler = async (
    deletedBookId: string,
    deletedBookRef?: string
  ) => {
    try {
      await deleteBook(deletedBookId, deletedBookRef);
      setBookWasDeleted(true);
    } catch (error) {}
  };
  const showAllBooks = (buttonId: string) => {
    setActiveButtonId(buttonId);
    setFiltredBooks(loadedBooks);
  };
  const showLentBooks = (buttonId: string) => {
    setActiveButtonId(buttonId);
    if (loadedBooks) {
      const filtredBooks = loadedBooks.filter(
        (book) => book.ownerId == auth?.id
      );
      setFiltredBooks(filtredBooks);
    }
  };
  const showBorrowedBooks = (buttonId: string) => {
    setActiveButtonId(buttonId);
    if (loadedBooks) {
      const filtredBooks = loadedBooks.filter(
        (book) => book.borrowerId == auth?.id
      );
      setFiltredBooks(filtredBooks);
    }
  };

  useEffect(() => {
    const setUsersBook = async () => {
      try {
        const books = await getUserBooksById(auth!.id);
        setLoadedBooks(books);
        setFiltredBooks(books);
      } catch (err) {}
    };
    setUsersBook();
    setBookWasDeleted(false);
  }, [bookWasDeleted]);

  const myLibraryButton = [
    {
      showbooksCathegory: showAllBooks,
      buttonText: "show all books",
      id: "all",
    },
    {
      showbooksCathegory: showLentBooks,
      buttonText: "show lent books",
      id: "lent",
    },
    {
      showbooksCathegory: showBorrowedBooks,
      buttonText: "show borrowed books",
      id: "borrowed",
    },
  ];
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
              {myLibraryButton.map((button) => (
                <MyLibraryButton
                  key={button.id}
                  showbooksCathegory={button.showbooksCathegory}
                  buttonText={button.buttonText}
                  buttonId={button.id}
                  isActive={button.id === activeButtonId}
                />
              ))}
            </div>
          </div>
        </div>
        <BookItemList items={filtredBooks} onDeleteBook={deleteBookHandler} />
      </AppearAnimation>
    </>
  );
};

export default MyLibrary;
