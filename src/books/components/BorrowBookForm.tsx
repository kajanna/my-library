import React from 'react';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

import './BorrowBookForm.scss'

interface BorrowBookFormProps {
    title: string,
    author: string,
    owner: string
}

function BorrowBookForm({ title, author, owner }: BorrowBookFormProps) {
  return (
    <Card title="Borrow" >
      <div className="borrow-book-form__main">
        <div className="borrow-book-form__info">
          <p><span>{title}</span><br></br>{author}</p>
          <p>owner: {owner}</p>
        </div>
        <div className="borrow-book-form-main__form">
          <InputElement label="message" textAreaEl/>
          <Button
            buttonText="send"
            onClick={() => {
              console.log("send");
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default BorrowBookForm;