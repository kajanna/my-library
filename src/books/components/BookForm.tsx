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
import FileUpload from '../../shared/Form/FileUpload';

import './BookForm.scss';

const bookFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("this field is required"),
  authors: Yup.string()
    .required("this field is required"),
  borrowerName: Yup.string(),
  coverFile: Yup.mixed()
    .test(
      "fileType",
      "incorrect File Type, we accept: jpg, jpeg, png, this field is not required",
      (value) =>
      !value || value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    )
});

interface BookFormProps {
    title: string,
    initialValues: BookFormFormikValues,
    bookId?: string | null |undefined,
    borrowerId?: string | null | undefined,
    editedbookUrl?: string | null | undefined,
}

function BookForm({ title, initialValues, bookId, borrowerId, editedbookUrl }: BookFormProps) {
  const navigate = useNavigate();
  const { addNewBook, clearError, editBookData, loading, firebaseError } =
    useFirebase();
  const auth = useContext(AuthContext);

  async function handleSubmit(values: BookFormFormikValues) {
    if (title === "Add new book") {
      const bookData: Book = {
        title: values.title,
        authors: values.authors,
        ownerName: auth!.name,
        ownerId: auth!.id,
        borrowerName: values.borrowerName,
        coverFile: values.coverFile,
      };
      try {
        await addNewBook(bookData);
        if (!firebaseError) {
          navigate("/my-library");
        }
      } catch (error) {}
    }
    if (bookId) {
      const editedbookData: EditedBookData = {
        title: values.title,
        authors: values.authors,
        borrowerName: values.borrowerName,
        id: bookId,
        coverFile: values.coverFile,
      };
      try {
        await editBookData(editedbookData);
        if (!firebaseError) {
          navigate("/my-library");
        }
      } catch (error) {}
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {firebaseError && (
        <ErrorModal errorText={firebaseError} closeErrorModal={clearError} />
      )}
      <Formik
        validationSchema={bookFormSchema}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values, isValid }) => (
          <Card title={title}>
            <Form>
              {isValid}
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
                {auth?.id != borrowerId && (
                  <InputElement
                    label="borrower"
                    id="borrowerNamer"
                    name="borrowerName"
                    type="text"
                    errors={errors}
                    touched={touched}
                  />
                )}
                <FileUpload file={values.coverFile} editedbookUrl={editedbookUrl} />
                <label htmlFor="coverFile" className="book-form__label">
                  add book cover
                </label>
                <input
                  style={{ display: "none" }}
                  accept=".jpg, .png, .jpeg"
                  id="coverFile"
                  type="file"
                  name="coverFile"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue("coverFile", event.currentTarget.files[0]);
                    }
                  }}
                />
              </div>
              <div className="book-form__button-section">
                <Button
                  buttonText={title === "Add new book" ? "add" : "edit"}
                  type="submit" 
                />
              </div>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
}

export default BookForm;