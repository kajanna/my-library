import React from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '../../shared/Card';
import Button from '../../shared/Button';
import InputElement from '../../shared/Form/InputElement';


const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("incorrect email")
      .required("required"),
    password: Yup.string()
      .min(8, "password should be at least 8 characters long")
      .required("required")
  });

interface LoginFormikValues {
    email: string,
    password: string 
}


function Login() {
    function handleSubmit (values: LoginFormikValues) {
        console.log(values);
    }

    return (
      <Formik
      validationSchema={loginSchema} 
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit} >
         {({ errors, touched }) => (
        <Card title="login" addContentPadding>
          <Form>
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
            <Button type="submit" buttonText="login" />
          </Form>
        </Card>
         )}
      </Formik>
    );
}

export default Login;