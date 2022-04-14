import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import LendBookForm from "../components/LendBookForm";
import AppearAnimation from "../../shared/AppearAnimation";
import useFirebase from "../../shared/hooks/useFirebase";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorModal from "../../shared/ErrorModal";
import { BookFormFormikValues } from "../../shared/shared_interfaces";

const LentBook = () => {
  const [lentBook, setLentBook] = useState<BookFormFormikValues>({
    title: "",
    authors: "",
    borrowerName: "",
  });
  const { getEditedBook, clearError, firebaseError, loading } = useFirebase();
  const { bookId } = useParams<string>();

  useEffect(() => {
    async function getLentBookData() {
      try {
        if (bookId) {
          const book = await getEditedBook(bookId);
          if (book) {
            setLentBook(book);
          }
        }
      } catch (error) {}
    }
    getLentBookData();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      {firebaseError && (
        <ErrorModal errorText={firebaseError} closeErrorModal={clearError} />
      )}
      <AppearAnimation>
        <LendBookForm
          title={lentBook.title}
          authors={lentBook.authors}
          borrowerName={lentBook.borrowerName}
          id={bookId!}
        />
      </AppearAnimation>
    </>
  );
}

export default LentBook;
