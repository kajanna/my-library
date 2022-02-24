import { useContext } from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import { Book, EditedBookData, BookFormFormikValues } from '../../shared/shared_interfaces';
import useFirebase from '../../shared/hooks/useFirebase';
import AuthContext from "../../shared/contexts/authContext";
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

import './BookForm.scss';

const bookFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("required"),
  authors: Yup.string()
    .required("required"),
  borrowerName: Yup.string()
});


interface BookFormProps {
    title: string,
    initialValues: BookFormFormikValues,
    bookId?: string | undefined
}


function BookForm({ title, initialValues, bookId }: BookFormProps) {
  const { addNewBook, clearError, editBookData, loading, firebaseError } = useFirebase();
  const auth = useContext(AuthContext);

  function handleSubmit(values: BookFormFormikValues) {
    if (title === "Add new book") {
      const bookData: Book = {
        title: values.title, 
        authors: values.authors,
        ownerName: auth!.name, 
        ownerId: auth!.id, 
        borrowerName: values.borrowerName,
      }
      addNewBook(bookData);
    } if (bookId) {
      const editedbookData: EditedBookData = {
        title: values.title, 
        authors: values.authors,
        borrowerName: values.borrowerName,
        id: bookId
      }
      editBookData(editedbookData);
    }
    
  }

  return (
    <Formik
      validationSchema={bookFormSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Card title={title}>
          <Form>
          {loading && <LoadingSpinner />}
          {firebaseError && <ErrorModal  errorText={firebaseError} closeErrorModal={clearError}/>}
            <div className="book-form__main">
              <InputElement
                label="title"
                id="title"
                name="title"
                type="text"
                errors={errors}
                touched={touched}
              />
              <InputElement
                label="author/authors"
                id="authors"
                name="authors"
                type="text"
                errors={errors}
                touched={touched}
              />
              <InputElement
                label="borrower"
                id="borrowerNamer"
                name="borrowerName"
                type="text"
                errors={errors}
                touched={touched}
              />
              {/* <div>AddBookCover</div> */}
            </div>
            <div className="book-form__button-section">
              <Button buttonText={title === "Add new book"? "add" : "edit"} type="submit" />
            </div>
            
          </Form>
        </Card>
      )}
    </Formik>
  );
}

export default BookForm;