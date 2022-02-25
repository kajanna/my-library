import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import Button from '../../shared/Button';
import InputElement from '../../shared/Form/InputElement';
import useAuth from '../../shared/hooks/useAuth';
import LoadingSpinner from '../../shared/LoadingSpinner';

const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("this field is required"),
    email: Yup.string()
      .email("email address is incorrect")
      .required("this field is required"),
    password: Yup.string()
      .min(8, "password should be at least 8 characters long")
      .required("this field is required")
  });

  interface RegisterFormikValues {
      name: string,
      email: string,
      password: string
}


function Register() {
  const { loading, authError, register } = useAuth();

  async function handleSubmit(values: RegisterFormikValues) {
    try {
      await register(values.email, values.password, values.name);
    } catch (err){}
    
  }
  return (
    <>
    {loading && <LoadingSpinner />}
    {authError && <p>{authError}</p>}
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
       {({ errors, touched }) => (
      <Card title="register" addContentPadding>
        <Form>
          <InputElement 
            label="name" 
            id="name" 
            name="name" 
            type="text"
            errors={errors}
                  touched={touched} />
          <InputElement 
            label="email" 
            id="email" 
            name="email" 
            type="email"
            errors={errors}
                  touched={touched} />
          <InputElement
            label="password"
            id="password"
            name="password"
            type="password"
            errors={errors}
                  touched={touched}
          />
          <Button buttonText="Register" type="submit" />
        </Form>
      </Card>
       )}
    </Formik>
    </>
  );
}

export default Register;