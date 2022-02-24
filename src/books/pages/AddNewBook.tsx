import React from 'react';

import BookForm from '../components/BookForm';

import AppearAnimation from '../../shared/AppearAnimation';


function AddNewBook() {
    return (
        <AppearAnimation>
            <BookForm title="Add new book" initialValues={{ title: "", authors: "", borrowerName: "" }}/>
        </AppearAnimation>
    );
}

export default AddNewBook;