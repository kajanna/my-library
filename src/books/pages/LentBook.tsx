import React from 'react';
import LentBookForm from '../components/LentBookForm';

function BorrowBook() {
    return (
        <div>
            <LentBookForm title="Lord of the Rings" author="J.R.R. Tolkien" owner="Dominik"/>
        </div>
    );
}

export default BorrowBook;