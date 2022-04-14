import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Card from "../../shared/Card";
import InputElement from "../../shared/Form/InputElement";
import Button from "../../shared/Button";
import AppearAnimation from "../../shared/AppearAnimation";
import AuthContext from "../../shared/contexts/authContext";
import useFirebase from "../../shared/hooks/useFirebase";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorModal from "../../shared/ErrorModal";
import FileUpload from "../../shared/Form/FileUpload";
import { Book } from "../../shared/shared_interfaces";

const borrowBookSchema = Yup.object().shape({
  title: Yup.string().required("this field is required"),
  authors: Yup.string().required("this field is required"),
  ownerName: Yup.string().required("this field is required"),
  coverFile: Yup.mixed().test(
    "fileType",
    "incorrect File Type, we accept: jpg, jpeg, png, this field is not required",
    (value) =>
      !value ||
      (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
  ),
});

interface BorrowBookFormikValues {
  title: string;
  authors: string;
  ownerName: string;
  coverFile: any;
}

const BorrowBook = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { addNewBook, loading, firebaseError, clearError } = useFirebase();

  async function handleSubmit(values: BorrowBookFormikValues) {
    const bookData: Book = {
      title: values.title,
      authors: values.authors,
      ownerName: values.ownerName,
      ownerId: "",
      borrowerName: auth!.name,
      borrowerId: auth!.id,
      coverFile: values.coverFile,
    };
    try {
      await addNewBook(bookData);
      if (!firebaseError) {
        navigate("/my-library");
      }
    } catch (error) {}
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {firebaseError && (
        <ErrorModal errorText={firebaseError} closeErrorModal={clearError} />
      )}
      <Formik
        validationSchema={borrowBookSchema}
        initialValues={{
          title: "",
          authors: "",
          ownerName: "",
          coverFile: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
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
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    errors={errors}
                    touched={touched}
                  />
                  <FileUpload file={values.coverFile} />
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
                        setFieldValue(
                          "coverFile",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                  />
                </div>
                <div className="book-form__button-section">
                  <Button buttonText="Borrow" type="submit" />
                </div>
              </Form>
            </Card>
          </AppearAnimation>
        )}
      </Formik>
    </>
  );
};

export default BorrowBook;
