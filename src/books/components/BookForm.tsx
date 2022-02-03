import React from 'react';
import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

import './BookForm.scss';

interface BookFormProps {
    title: string
}

function BookForm({ title }: BookFormProps) {
  return (
    <Card title={title}>
      <div className="book-form__main">
        <InputElement label="title" />
        <InputElement label="author/authors" />
        <InputElement label="description" textAreaEl />
        <div> AddBookCover</div>
      </div>
      <div className="book-form__button-section">
        <Button buttonText="add" onClick={() => console.log("add")} />
      </div>
    </Card>
  );
}

export default BookForm;