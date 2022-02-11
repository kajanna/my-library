import React from 'react';
import BookForm from '../components/BookForm';

import AppearAnimation from '../../shared/AppearAnimation';

function EditBookData() {
    return (
        <AppearAnimation>
            <BookForm title="Edit book data"/>
        </AppearAnimation>
    );
}

export default EditBookData;