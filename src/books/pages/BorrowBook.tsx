import React from 'react';

import Card from '../../shared/Card';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

function BorrowBook() {
    return (
        <Card title="Borrow">
          <div className="book-form__main">
            <InputElement label="title" />
            <InputElement label="author/authors" />
            <InputElement label="owner"/>
            <div> AddBookCover</div>
          </div>
          <div className="book-form__button-section">
            <Button buttonText="Borrow" onClick={() => console.log("Borrow")} />
          </div>
        </Card>
    );
}

export default BorrowBook;