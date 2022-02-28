import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { BookFormFormikValues } from '../../shared/shared_interfaces';
import useFirebase from '../../shared/hooks/useFirebase';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

import AppearAnimation from '../../shared/AppearAnimation';


function EditBookData() {
    const [ formValues, setFormValues ] = useState<BookFormFormikValues>({
        title: "",
        authors: "",
        borrowerName:""
    });
    const [ borrowerId, setBorrowerId ] = useState<string | null>();
    const { bookId } = useParams<string>();
    const { getEditedBook, clearError, loading, firebaseError } = useFirebase();
    
    
    useEffect(() => {
      async function getInitialFormValues() {
        try {
          if (bookId) {
            const book = await getEditedBook(bookId);
            if (book) {
              setFormValues({
                title: book.title,
                authors: book.authors,
                borrowerName: book.borrowerName,
              });
              setBorrowerId(book.borrowerId);
            }
          }
        } catch (error) {}
      }
      getInitialFormValues();
      return () => {
        getInitialFormValues();
      };
    }, []);



    return (
        <>
        {loading && <LoadingSpinner />}
        {firebaseError && <ErrorModal  errorText={firebaseError} closeErrorModal={clearError}/>}
        <AppearAnimation>
            <BookForm title="Edit book data" initialValues={formValues} bookId={bookId} borrowerId={borrowerId}/>
        </AppearAnimation>
        </>
    );
}

export default EditBookData;