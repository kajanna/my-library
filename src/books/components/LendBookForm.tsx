import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';


import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

import './LendBookForm.scss';

const lendBookSchema = Yup.object().shape({
  borrower: Yup.string()
    .required("required"),
});

interface LendBookFormProps {
    title: string,
    author: string,
}
interface LendBookFormikValues {
  borrower: string
}

function LendBookForm({ title, author}: LendBookFormProps) {
  function handleSubmit(values: LendBookFormikValues) {
    console.log(values);
  }
  return (
    <Formik
      validationSchema={lendBookSchema}
      initialValues={{
        borrower: "",
      }}
      onSubmit={handleSubmit}
    >
      <Card title="Lend">
        <Form>
          <div className="lend-book-form__main">
            <div className="lend-book-form__info">
              <p>
                <span>{title}</span>
                <br></br>
                {author}
              </p>
            </div>
            <div className="lend-book-form-main__form">
              <InputElement
                label="borrower"
                id="borrower"
                name="borrower"
                type="text"
              />
              <Button type="submit" buttonText="send" />
            </div>
          </div>
        </Form>
      </Card>
    </Formik>
  );
}

export default LendBookForm;