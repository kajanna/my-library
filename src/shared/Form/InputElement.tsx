import React from 'react';

import './InputElement.scss';

interface InputElementProps {
    label: string,
    errorInput?: string | null,
    textAreaEl?: boolean | null
}

function InputElement({ label, errorInput, textAreaEl }: InputElementProps) {
  return (
    <div className="input-element">
      <label>{label}</label>
      {textAreaEl
      ? <textarea rows={4} />
      : <input />}
      <p className="input-element__error-text">{errorInput}</p>
    </div>
  );
}

export default InputElement;