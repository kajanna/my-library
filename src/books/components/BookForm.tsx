import React, {useContext} from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import { Book } from '../../shared/shared_interfaces';
import useFirebase from '../../shared/hooks/useFirebase';
import AuthContext from "../../shared/contexts/authContext";

import './BookForm.scss';

const bookFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("required"),
  authors: Yup.string()
    .required("required"),
  borrower: Yup.string()
    .required("required")
});

interface BookFormProps {
    title: string,
}
interface BookFormFormikValues {
  title: string,
  authors: string,
  borrower:string
}

function BookForm({ title }: BookFormProps) {
  const { addNewBook } = useFirebase();
  const user = useContext(AuthContext);

  function handleSubmit(values: BookFormFormikValues) {
    const date = new Date().getDate().toString();
    const newBook: Book = {
      title: values.title, 
      authors: values.authors,
      ownerName: user!.name, 
      ownerId: user!.id, 
      borrower: values.borrower,
      date: date,
    }
    console.log(newBook);
    addNewBook(newBook);
  }

  return (
    <Formik
      validationSchema={bookFormSchema}
      initialValues={{
        title: "",
        authors: "",
        borrower: "",
      }}
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