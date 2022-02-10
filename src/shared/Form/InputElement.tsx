import React, { useState} from 'react';

import { Field } from 'formik';
import './InputElement.scss';

interface InputElementProps {
    label: string,
    id: string,
    name: string,
    type:string,
}

function InputElement({ label, id, name, type }: InputElementProps) {
  return (
    <div className="input-element">
      <label htmlFor={label}>{label}</label>
      <Field
            id={id}
            name={name}
            type={type}
          />
      <p className="input-element__error-text"> </p>
    </div>
  );
}

export default InputElement;