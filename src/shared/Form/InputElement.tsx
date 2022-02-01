import React from 'react';

import './InputElement.scss';

interface InputElementProps {
    label: string,
    errorInput?: string | null
}

function InputElement({ label, errorInput }: InputElementProps) {
  return (
    <div className="input-element">
      <label>{label}</label>
      <input />
      <p className="input-element__error-text">{errorInput}</p>
    </div>
  );
}

export default InputElement;