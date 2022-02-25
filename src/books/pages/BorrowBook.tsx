import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import AppearAnimation from '../../shared/AppearAnimation';
import AuthContext from '../../shared/contexts/authContext';
import useFirebase from '../../shared/hooks/useFirebase';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';

import { Book } from '../../shared/shared_interfaces'

const borrowBookSchema = Yup.object().shape({
  title: Yup.string()
  .required("this field is required"),
  authors: Yup.string()
  .required("this field is required"),
  ownerName: Yup.string()
  .required("this field is required") 
});

interface BorrowBookFormikValues {
  title: string,
  authors: string,
  ownerName:string
}

function BorrowBook() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { addNewBook, loading, firebaseError, clearError } = useFirebase();

  async function handleSubmit(values: BorrowBookFormikValues) {
    const bookData: Book = {
      title: values.title,
      authors: values.authors,
      ownerName: values.ownerName,
      ownerId:'',
      borrowerName: auth!.name,
      borrowerId: auth!.id,
    };
    try {
      await addNewBook(bookData);
      if (!firebaseError) {
        navigate("/my-library");
      }
    } catch (error) {}
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {firebaseError && (
        <ErrorModal errorText={firebaseError} closeErrorModal={clearError} />
      )}
      <Formik
        validationSchema={borrowBookSchema}
        initialValues={{
          title: "",
          authors: "",
          ownerName: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <AppearAnimation>
            <Card title="Borrow">
              <Form>
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
                    id="ownerName"
                    name="ownerName"
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
    </>
  );
}

export default BorrowBook;