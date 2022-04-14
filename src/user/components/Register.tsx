import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import InputElement from "../../shared/Form/InputElement";
import useAuth from "../../shared/hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorModal from "../../shared/ErrorModal";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("this field is required"),
  email: Yup.string()
    .email("email address is incorrect")
    .required("this field is required"),
  password: Yup.string()
    .min(8, "password should be at least 8 characters long")
    .required("this field is required"),
});

interface RegisterFormikValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { loading, authError, register, clearAuthError } = useAuth();

  async function handleSubmit(values: RegisterFormikValues) {
    try {
      const uid = await register(values.email, values.password, values.name);
      if (uid) {
        navigate("/my-library");
      }
    } catch (err) {}
  }
  return (
    <>
      {loading && <LoadingSpinner />}
      {authError && (
        <ErrorModal errorText={authError} closeErrorModal={clearAuthError} />
      )}
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
                touched={touched}
              />
              <InputElement
                label="email"
                id="email"
                name="email"
                type="email"
                errors={errors}
                touched={touched}
              />
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
