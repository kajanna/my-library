import React from 'react';

import {Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import Button from '../../shared/Button';
import InputElement from '../../shared/Form/InputElement';

const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("required"),
    email: Yup.string()
      .email("incorrect email")
      .required("required"),
    password: Yup.string()
      .min(8, "password should be at least 8 characters long")
      .required("required")
  });

  interface RegisterFormikValues {
      name: string | null,
      email: string | null,
      password: string | null
}


function Register() {
  function handleSubmit(values: RegisterFormikValues) {
    console.log(values);
  }
  return (
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
          <Button buttonText="Register" />
        </Form>
      </Card>
       )}
    </Formik>
  );
}

export default Register;