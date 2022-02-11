import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import AppearAnimation from '../../shared/AppearAnimation';

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
  function handleSubmit(values: BorrowBookFormikValues) {
    console.log(values);
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
              <div> AddBookCover</div>
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