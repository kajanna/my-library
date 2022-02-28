import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
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
    .required("this field is required"),
  authors: Yup.string()
    .required("this field is required"),
  borrowerName: Yup.string()
});


interface BookFormProps {
    title: string,
    initialValues: BookFormFormikValues,
    bookId?: string | undefined,
    borrowerId?: string | null
}


function BookForm({ title, initialValues, bookId, borrowerId }: BookFormProps) {
  const navigate = useNavigate();
  const { addNewBook, clearError, editBookData, loading, firebaseError } = useFirebase();
  const auth = useContext(AuthContext);

  async function handleSubmit(values: BookFormFormikValues) {
    if (title === "Add new book") {
      const bookData: Book = {
        title: values.title, 
        authors: values.authors,
        ownerName: auth!.name, 
        ownerId: auth!.id, 
        borrowerName: values.borrowerName,
      }
      try {
        await addNewBook(bookData);
        if (!firebaseError) {
          navigate('/my-library');
        }
      } catch(error) {}
      
    } if (bookId) {
      const editedbookData: EditedBookData = {
        title: values.title, 
        authors: values.authors,
        borrowerName: values.borrowerName,
        id: bookId
      }
      try {
        await editBookData(editedbookData);
        if (!firebaseError) {
          navigate('/my-library');
        }
      } catch(error) {}
    } 
  }

  return (
    <>
     {loading && <LoadingSpinner />}
     {firebaseError && <ErrorModal  errorText={firebaseError} closeErrorModal={clearError}/>}
    <Formik
      validationSchema={bookFormSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Card title={title}>
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
              {auth?.id != borrowerId && <InputElement
                label="borrower"
                id="borrowerNamer"
                name="borrowerName"
                type="text"
                errors={errors}
                touched={touched}
              />}
              {/* <div>AddBookCover</div> */}
            </div>
            <div className="book-form__button-section">
              <Button buttonText={title === "Add new book"? "add" : "edit"} type="submit" />
            </div>
            
          </Form>
        </Card>
      )}
    </Formik>
    </>
  );
}

export default BookForm;