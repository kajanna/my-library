import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';


import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';
import useFirebase from '../../shared/hooks/useFirebase';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';
import { EditedBookData } from '../../shared/shared_interfaces'

import './LendBookForm.scss';

const lendBookSchema = Yup.object().shape({
  borrowerName: Yup.string(),
});


interface LendBookFormikValues {
  borrowerName: string | null | undefined
}

function LendBookForm({ authors, title, borrowerName, id }: EditedBookData) {
  const { editBookData, clearError, loading, firebaseError } = useFirebase();

  function handleSubmit(values: LendBookFormikValues) {
    const editedData = {
      authors, 
      title, 
      borrowerName: values.borrowerName, 
      id
    }
    editBookData(editedData)
  }
  return (
    <>
    {loading && <LoadingSpinner />}
    {firebaseError && <ErrorModal  errorText={firebaseError} closeErrorModal={clearError}/>}
    <Formik
      enableReinitialize
      validationSchema={lendBookSchema}
      initialValues={{
        borrowerName: borrowerName,
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Card title="Lend">
          <Form>
            <div className="lend-book-form__main">
              <div className="lend-book-form__info">
                <p>
                  <span>{title}</span>
                  <br></br>
                  {authors}
                  <br></br>
                  <br></br>
                  former borrower:
                  <br></br> 
                  {borrowerName}
                </p>
              </div>
              <div className="lend-book-form-main__form">
                <InputElement
                  label="borrower"
                  id="borrowerName"
                  name="borrowerName"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
                <Button type="submit" buttonText="send" />
              </div>
            </div>
          </Form>
        </Card>
      )}
    </Formik>
    </>
  );
}

export default LendBookForm;