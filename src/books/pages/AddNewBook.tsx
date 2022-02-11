import React from 'react';

import BookForm from '../components/BookForm';

import AppearAnimation from '../../shared/AppearAnimation';

function AddNewBook() {
    return (
        <AppearAnimation>
            <BookForm title="AddNewBook"/>
        </AppearAnimation>
    );
}

export default AddNewBook;