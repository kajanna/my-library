import { ErrorMessage } from "formik";
import { FormikErrors } from "formik";
import { FormikTouched } from "formik";
import { Field } from "formik";

import "./InputElement.scss";

interface InputElementProps {
  label: string;
  id: string;
  name: string;
  type: string;
  errors: FormikErrors<{ [field: string]: any }>;
  touched: FormikTouched<{ [field: string]: any }>;
}

const InputElement = ({
  label,
  id,
  name,
  type,
  errors,
  touched,
}: InputElementProps) => {
  return (
    <div className="input-element">
      <label htmlFor={label}>{label}</label>
      <div
        className={errors[name] && touched[name] ? "input-element--error" : ""}
      >
        <Field id={id} name={name} type={type} />
      </div>
      <div className="input-element__error-message">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

export default InputElement;
