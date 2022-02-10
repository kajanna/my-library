import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

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
    title: string
}
interface BookFormFormikValues {
  title: string,
  authors: string,
  borrower:string
}

function BookForm({ title }: BookFormProps) {
  function handleSubmit(values: BookFormFormikValues) {
    console.log(values);
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
      <Card title={title}>
        <Form>
          <div className="book-form__main">
            <InputElement 
              label="title" 
              id="title" 
              name="title" 
              type="text" />
            <InputElement
              label="author/authors"
              id="authors"
              name="authors"
              type="text"
            />
            <InputElement
              label="borrower"
              id="borrower"
              name="borrower"
              type="text"
            />
            <div>AddBookCover</div>
          </div>
          <div className="book-form__button-section">
            <Button buttonText="add" type="submit" />
          </div>
        </Form>
      </Card>
    </Formik>
  );
}

export default BookForm;