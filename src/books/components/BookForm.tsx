import { useContext } from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import { newBookData } from '../../shared/shared_interfaces';
import useFirebase from '../../shared/hooks/useFirebase';
import AuthContext from "../../shared/contexts/authContext";
import { BookFormFormikValues, editedBookData } from '../../shared/shared_interfaces';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

import './BookForm.scss';

const bookFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("required"),
  authors: Yup.string()
    .required("required"),
  borrower: Yup.string()
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
    const date = new Date().toString();
    if (title === "Add new book") {
      const bookData: newBookData = {
        title: values.title, 
        authors: values.authors,
        ownerName: auth!.name, 
        ownerId: auth!.id, 
        borrower: values.borrower,
        date: date,
      }
      addNewBook(bookData);
    } if (bookId) {
      const editedbookData: editedBookData = {
        title: values.title, 
        authors: values.authors,
        borrower: values.borrower,
        date: date,
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
                id="borrower"
                name="borrower"
                type="text"
                errors={errors}
                touched={touched}
              />
              {/* <div>AddBookCover</div> */}
            </div>
            <div className="book-form__button-section">
              <Button buttonText="add" type="submit" />
            </div>
            
          </Form>
        </Card>
      )}
    </Formik>
  );
}

export default BookForm;