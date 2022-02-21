import { useContext } from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import AppearAnimation from '../../shared/AppearAnimation';
import { newBookData } from '../../shared/shared_interfaces';
import AuthContext from '../../shared/contexts/authContext';
import useFirebase from '../../shared/hooks/useFirebase';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

const borrowBookSchema = Yup.object().shape({
  title: Yup.string()
  .required("required"),
  authors: Yup.string()
  .required("required"),
  owner: Yup.string()
  .required("required") 
});

interface BorrowBookFormikValues {
  title: string,
  authors: string,
  owner:string
}

function BorrowBook() {
  const auth = useContext(AuthContext);
  const { addNewBook, loading, firebaseError, clearError } = useFirebase();

  function handleSubmit(values: BorrowBookFormikValues) {
    const date = new Date().toString();
    const bookData: newBookData = {
      title: values.title,
      authors: values.authors,
      ownerName: values.owner,
      ownerId: values.owner,
      borrower: auth!.name,
      date: date,
    };
    addNewBook(bookData);
  }

  return (
    <Formik
      validationSchema={borrowBookSchema}
      initialValues={{
        title: "",
        authors: "",
        owner: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <AppearAnimation>
          <Card title="Borrow">
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
                  label="owner"
                  id="owner"
                  name="owner"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="book-form__button-section">
                <Button buttonText="Borrow" type="submit" />
              </div>
            </Form>
          </Card>
        </AppearAnimation>
      )}
    </Formik>
  );
}

export default BorrowBook;